<?php

namespace App\Services\Ai;

use App\Models\AiGeneration;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class BlogGeneratorService
{
    public function __construct(protected AiManager $manager)
    {
    }

    /**
     * Generate a blog post synchronously and persist it as a draft.
     *
     * @param  array{
     *     topic: string,
     *     provider?: string,
     *     model?: string|null,
     *     tone?: string,
     *     language?: string,
     *     word_count?: int,
     *     keywords?: array<int, string>|string,
     *     category_id?: int|null,
     *     status?: string,
     *     scheduled_at?: string|null,
     *     search_interest?: int|string|null,
     *     increase_percent?: int|string|null,
     *     user: User
     * }  $input
     *
     * @return Post
     *
     * @throws RuntimeException When generation or parsing fails.
     */
    public function generate(array $input): Post
    {
        $provider = $this->manager->driver($input['provider'] ?? null);
        $model = $input['model'] ?? $this->manager->modelFor($provider->name());

        $systemPrompt = $this->buildSystemPrompt();
        $userPrompt = $this->buildUserPrompt($input);

        try {
            $raw = $provider->generate($systemPrompt, $userPrompt, $model);
        } catch (Throwable $e) {
            $this->logGeneration($input, $provider->name(), $model, $raw ?? null, 'failed', null, $e->getMessage());
            throw new RuntimeException('AI generation failed: ' . $e->getMessage(), 0, $e);
        }

        $parsed = $this->parseOutput($raw);

        $post = DB::transaction(function () use ($input, $parsed, $provider, $model, $raw) {
            $post = $this->createPost($input, $parsed);

            $this->logGeneration($input, $provider->name(), $model, $raw, 'success', $post->id);

            return $post;
        });

        return $post->load(['user', 'category', 'tags']);
    }

    /**
     * Get the list of trending topics from config.
     *
     * @return array<int, array{query: string, search_interest: int, increase_percent: int|string}>
     */
    public function trendingTopics(?string $sort = null): array
    {
        $topics = config('ai_topics.topics', []);

        if (!is_array($topics) || $topics === []) {
            return [];
        }

        $sort = $sort ?: config('ai_topics.default_sort', 'interest');

        usort($topics, function (array $a, array $b) use ($sort): int {
            if ($sort === 'increase' || $sort === 'increase_desc') {
                $av = $this->numericIncrease($a['increase_percent'] ?? 0);
                $bv = $this->numericIncrease($b['increase_percent'] ?? 0);
                return $bv <=> $av;
            }

            return ($b['search_interest'] ?? 0) <=> ($a['search_interest'] ?? 0);
        });

        return array_values($topics);
    }

    /**
     * Bulk-generate blog posts from the trending topic list.
     *
     * @param  array{
     *     limit?: int,
     *     status?: string,
     *     provider?: string,
     *     model?: string|null,
     *     tone?: string,
     *     language?: string,
     *     word_count?: int,
     *     category_id?: int|null,
     *     sort?: string,
     *     min_increase?: int,
     *     user: User
     * }  $options
     *
     * @return array{generated: int, posts: array<int, Post>}
     */
    public function generateFromTrending(array $options): array
    {
        $user = $options['user'];
        $limit = max(1, min((int) ($options['limit'] ?? 10), 100));
        $sort = $options['sort'] ?? null;
        $minIncrease = (int) ($options['min_increase'] ?? 0);

        $topics = collect($this->trendingTopics($sort));

        if ($minIncrease > 0) {
            $topics = $topics->filter(function (array $topic) use ($minIncrease): bool {
                return $this->numericIncrease($topic['increase_percent'] ?? 0) >= $minIncrease;
            });
        }

        $posts = [];
        $generated = 0;

        foreach ($topics->take($limit) as $topic) {
            $input = [
                'topic' => $topic['query'],
                'provider' => $options['provider'] ?? null,
                'model' => $options['model'] ?? null,
                'tone' => $options['tone'] ?? config('ai.defaults.tone', 'professional'),
                'language' => $options['language'] ?? config('ai.defaults.language', 'en'),
                'word_count' => $options['word_count'] ?? config('ai.defaults.word_count', 800),
                'keywords' => $this->keywordsForTopic($topic['query']),
                'category_id' => $options['category_id'] ?? null,
                'status' => $options['status'] ?? 'draft',
                'search_interest' => $topic['search_interest'] ?? 0,
                'increase_percent' => $topic['increase_percent'] ?? 0,
                'user' => $user,
            ];

            try {
                $posts[] = $this->generate($input);
                $generated++;
            } catch (Throwable $e) {
                // Continue generating the rest; each failure is already logged.
                continue;
            }
        }

        return ['generated' => $generated, 'posts' => $posts];
    }

    /**
     * Derive a small keyword list from the trending query.
     *
     * @return array<int, string>
     */
    protected function keywordsForTopic(string $query): array
    {
        $keywords = array_values(array_filter(array_map(
            'trim',
            preg_split('/[\s,;]+/', Str::lower($query)) ?: []
        )));

        // Keep only meaningful words (3+ chars, not common stop words).
        $stop = ['the', 'and', 'for', 'with', 'that', 'this', 'your', 'you', 'are', 'how', 'what', 'why', 'can', 'might', 'help'];
        $keywords = array_values(array_filter($keywords, function (string $word) use ($stop): bool {
            return strlen($word) >= 3 && !in_array($word, $stop, true);
        }));

        return array_slice(array_unique($keywords), 0, 6);
    }

    /**
     * Convert an "increase_percent" value to an int. Handles the "Breakout" string.
     */
    protected function numericIncrease(int|string|null $value): int
    {
        if ($value === null || $value === '') {
            return 0;
        }

        if (is_string($value)) {
            $cleaned = preg_replace('/[^0-9.\-]/', '', $value);

            return $cleaned === '' || $cleaned === null ? 0 : (int) round((float) $cleaned);
        }

        return (int) $value;
    }

    /**
     * Build the system-level prompt instructing the model how to respond.
     */
    protected function buildSystemPrompt(): string
    {
        return <<<'PROMPT'
You are an expert blog writer and content strategist. You write clear, engaging, well-structured
blog articles in Markdown format.

Your output MUST be a single valid JSON object (no markdown code fences, no trailing text) with
exactly these keys:
- "title": string (a compelling, SEO-friendly title, max 120 characters)
- "excerpt": string (a short 1-2 sentence summary, max 300 characters)
- "content": string (the full article body in Markdown, using ## or ### headings, paragraphs,
  bullet lists, and short code blocks where appropriate)

Rules:
- Write original, factual-sounding content. Do not fabricate specific statistics, quotes, or
  citations. Use general, hedged language when uncertain.
- Use a clear introduction, several body sections with subheadings, and a conclusion.
- Avoid markdown code fences around the JSON. Output ONLY the JSON object.
PROMPT;
    }

    /**
     * Build the user prompt from the request input.
     */
    protected function buildUserPrompt(array $input): string
    {
        $topic = trim($input['topic'] ?? '');
        $tone = trim($input['tone'] ?? config('ai.defaults.tone', 'professional'));
        $language = trim($input['language'] ?? config('ai.defaults.language', 'en'));
        $wordCount = (int) ($input['word_count'] ?? config('ai.defaults.word_count', 800));
        $maxWordCount = (int) config('ai.defaults.max_word_count', 4000);

        $wordCount = max(300, min($wordCount, $maxWordCount));

        $keywords = $input['keywords'] ?? [];
        if (is_string($keywords)) {
            $keywords = array_filter(array_map('trim', explode(',', $keywords)));
        }

        $prompt = "Write a blog article about the following topic.\n\n";
        $prompt .= "Topic: {$topic}\n";
        $prompt .= "Tone: {$tone}\n";
        $prompt .= "Language: {$language}\n";
        $prompt .= "Approximate length: {$wordCount} words.\n";

        if (!empty($keywords)) {
            $prompt .= 'Primary keywords to include: ' . implode(', ', $keywords) . "\n";
        }

        $searchInterest = $input['search_interest'] ?? null;
        $increasePercent = $input['increase_percent'] ?? null;

        if ($searchInterest !== null && $searchInterest !== '') {
            $prompt .= "Google search interest for this topic: {$searchInterest} (relative 0-100 scale).\n";
        }

        if ($increasePercent !== null && $increasePercent !== '') {
            $prompt .= "Google search volume increase for this topic: {$increasePercent}%.\n";
        }

        $prompt .= "Return your answer as JSON with the keys: title, excerpt, content.";

        return $prompt;
    }

    /**
     * Parse and validate the raw provider output into an array.
     *
     * @return array{title: string, excerpt: string, content: string}
     */
    protected function parseOutput(string $raw): array
    {
        $json = $this->extractJson($raw);

        if ($json === null) {
            throw new RuntimeException('AI response was not valid JSON.');
        }

        $title = trim((string) ($json['title'] ?? ''));
        $content = trim((string) ($json['content'] ?? ''));
        $excerpt = trim((string) ($json['excerpt'] ?? Str::limit(strip_tags($content), 200)));

        if ($title === '' || $content === '') {
            throw new RuntimeException('AI response is missing a title or content.');
        }

        return [
            'title' => $title,
            'excerpt' => $excerpt,
            'content' => $content,
        ];
    }

    /**
     * Attempt to extract a JSON object from a raw string, tolerating markdown fences
     * and leading/trailing prose.
     *
     * @return array<mixed>|null
     */
    protected function extractJson(string $raw): ?array
    {
        // Strip common markdown code fences.
        $raw = trim(preg_replace('/^```(?:json)?\s*|\s*```$/i', '', trim($raw)));

        // Try direct decode first.
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            return $decoded;
        }

        // Fallback: find the first { ... } block in the text.
        if (preg_match('/\{(?:[^{}]|(?R))*\}/s', $raw, $m)) {
            $decoded = json_decode($m[0], true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        return null;
    }

    /**
     * Create (or update) the Post record from the parsed AI output.
     */
    protected function createPost(array $input, array $parsed): Post
    {
        $title = $parsed['title'];
        $slug = $this->uniqueSlug($title);

        $categoryId = $input['category_id'] ?? null;

        // Validate category belongs to a real row.
        if ($categoryId && !Category::whereKey($categoryId)->exists()) {
            $categoryId = null;
        }

        // Ensure a category is always assigned (some schemas require NOT NULL).
        if (!$categoryId) {
            $categoryId = Category::value('id')
                ?? Category::create([
                    'name' => 'AI Generated',
                    'slug' => 'ai-generated',
                    'description' => 'Posts generated automatically by the AI writer.',
                ])->id;
        }

        $data = [
            'user_id' => $input['user']->id,
            'category_id' => $categoryId,
            'title' => $title,
            'slug' => $slug,
            'excerpt' => $parsed['excerpt'],
            'content' => $parsed['content'],
            'status' => $input['status'] ?? 'draft',
            'visibility' => 'public',
            'ai_generated' => true,
            'ai_generation_data' => [
                'provider' => $input['provider'] ?? config('ai.default', 'mock'),
                'model' => $input['model'] ?? null,
                'topic' => $input['topic'] ?? null,
                'tone' => $input['tone'] ?? null,
            ],
        ];

        if (!empty($input['scheduled_at'])) {
            $data['scheduled_at'] = $input['scheduled_at'];
            $data['status'] = 'draft';
            $data['visibility'] = 'scheduled';
        }

        if (($data['status'] ?? null) === 'published') {
            $data['published_at'] = now();
        }

        $post = Post::create($data);

        return $post;
    }

    /**
     * Generate a unique slug for a title.
     */
    protected function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'ai-generated-post';
        $slug = $base;
        $i = 2;

        while (Post::where('slug', $slug)->exists()) {
            $slug = $base . '-' . $i;
            $i++;
        }

        return $slug;
    }

    /**
     * Persist a record of the generation attempt.
     *
     * @param  array<mixed>  $input
     */
    protected function logGeneration(
        array $input,
        string $provider,
        string $model,
        ?string $response,
        string $status,
        ?int $postId,
        ?string $error = null,
    ): void {
        AiGeneration::create([
            'user_id' => $input['user']->id,
            'provider' => $provider,
            'model' => $model,
            'topic' => $input['topic'] ?? null,
            'prompt' => $this->buildUserPrompt($input),
            'response' => $response,
            'status' => $status,
            'error' => $error,
            'post_id' => $postId,
        ]);
    }
}

