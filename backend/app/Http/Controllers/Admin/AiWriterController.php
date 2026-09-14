<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ai\GenerateBlogRequest;
use App\Jobs\GenerateBlogJob;
use App\Models\AiGeneration;
use App\Models\Category;
use App\Services\Ai\AiManager;
use App\Services\Ai\BlogGeneratorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\View\View;
use RuntimeException;
use Throwable;

class AiWriterController extends Controller
{
    public function __construct(
        protected AiManager $manager,
        protected BlogGeneratorService $service,
    ) {
    }

   
    public function index(): View
    {
        $generations = AiGeneration::with('post')
            ->latest()
            ->limit(20)
            ->get();

        return view('admin.ai-writer.index', [
            'providers' => $this->manager->availableProviders(),
            'categories' => Category::orderBy('name')->get(),
            'generations' => $generations,
            'trendingTopics' => $this->service->trendingTopics(),
        ]);
    }

    /**
     * Generate a single blog post from a trending topic entry.
     */
    public function generateTrending(Request $request): RedirectResponse
    {
        $topic = collect($this->service->trendingTopics())
            ->firstWhere('query', $request->input('topic'));

        if ($topic === null) {
            throw new RuntimeException('Unknown trending topic.');
        }

        $input = [
            'topic' => $topic['query'],
            'provider' => $request->input('provider'),
            'tone' => $request->input('tone'),
            'language' => $request->input('language'),
            'word_count' => (int) $request->input('word_count', config('ai.defaults.word_count', 800)),
            'keywords' => $topic['query'],
            'category_id' => $request->input('category_id') ? (int) $request->input('category_id') : null,
            'status' => $request->input('status', 'draft'),
            'search_interest' => $topic['search_interest'] ?? 0,
            'increase_percent' => $topic['increase_percent'] ?? 0,
            'user' => $request->user(),
        ];

        try {
            $post = $this->service->generate($input);

            return redirect()->route('admin.posts.edit', $post)
                ->with('success', "AI blog post generated from trending topic \"{$post->title}\"! Review it before publishing.");
        } catch (RuntimeException $e) {
            return redirect()->route('admin.ai-writer.index')
                ->withErrors(['ai' => $e->getMessage()]);
        }
    }

    /**
     * Bulk-generate blog posts from the top trending topics.
     */
    public function generateTrendingBatch(Request $request): RedirectResponse
    {
        $limit = max(1, min((int) $request->input('limit', 10), 50));

        $options = [
            'user' => $request->user(),
            'limit' => $limit,
            'provider' => $request->input('provider'),
            'tone' => $request->input('tone'),
            'language' => $request->input('language'),
            'word_count' => (int) $request->input('word_count', config('ai.defaults.word_count', 800)),
            'category_id' => $request->input('category_id') ? (int) $request->input('category_id') : null,
            'status' => $request->input('status', 'draft'),
        ];

        try {
            $result = $this->service->generateFromTrending($options);

            return redirect()->route('admin.ai-writer.index')
                ->with('success', "Generated {$result['generated']} blog post(s) from trending topics.");
        } catch (Throwable $e) {
            return redirect()->route('admin.ai-writer.index')
                ->withErrors(['ai' => 'Trending batch generation failed: ' . $e->getMessage()]);
        }
    }

    /**
     * Generate a blog post synchronously (default) or dispatch to the queue.
     */
    public function generate(GenerateBlogRequest $request): RedirectResponse
    {
        $input = array_merge($request->validated(), [
            'user' => $request->user(),
        ]);

        $async = (bool) $request->input('async', false);

        try {
            if ($async) {
                // Store a pending record so the admin can see queued jobs.
                $generation = AiGeneration::create([
                    'user_id' => $request->user()->id,
                    'provider' => $input['provider'] ?? config('ai.default', 'mock'),
                    'model' => $input['model'] ?? '',
                    'topic' => $input['topic'] ?? null,
                    'prompt' => 'Queued for background generation.',
                    'status' => 'pending',
                ]);

                dispatch(new GenerateBlogJob($input));

                return redirect()->route('admin.ai-writer.index')
                    ->with('success', 'Blog generation has been queued. It will appear shortly.');
            }

            $post = $this->service->generate($input);

            return redirect()->route('admin.posts.edit', $post)
                ->with('success', 'AI blog post generated successfully! Review it before publishing.');
        } catch (RuntimeException $e) {
            return redirect()->route('admin.ai-writer.index')
                ->withErrors(['ai' => $e->getMessage()]);
        }
    }
}

