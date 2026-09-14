<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\Ai\BlogGeneratorService;
use Illuminate\Console\Command;
use Throwable;

class GenerateTrendingPosts extends Command
{
    protected $signature = 'blog:generate-trending
        {--limit=10 : Number of trending topics to generate (max 100)}
        {--status=draft : Post status (draft|published)}
        {--provider=mock : AI provider (openai|gemini|mock)}
        {--model= : Optional model override}
        {--tone=professional : Writing tone}
        {--language=en : Output language}
        {--word-count=800 : Approximate word count}
        {--category-id= : Optional category ID}
        {--sort= : Sort order (interest|increase)}
        {--min-increase=0 : Minimum search increase % to include}
        {--admin-email=admin@kreightor.com : Admin user email to attribute posts to}';

    protected $description = 'Bulk-generate AI blog posts from the trending topic list';

    public function handle(BlogGeneratorService $service): int
    {
        $adminEmail = (string) $this->option('admin-email');
        $user = User::where('email', $adminEmail)->first();

        if (!$user) {
            $user = User::where('is_admin', true)->first();
        }

        if (!$user) {
            $this->error("No user found for email [{$adminEmail}] and no admin user exists.");

            return self::FAILURE;
        }

        $options = [
            'user' => $user,
            'limit' => (int) $this->option('limit'),
            'status' => (string) $this->option('status'),
            'provider' => (string) $this->option('provider'),
            'model' => $this->option('model') ? (string) $this->option('model') : null,
            'tone' => (string) $this->option('tone'),
            'language' => (string) $this->option('language'),
            'word_count' => (int) $this->option('word-count'),
            'category_id' => $this->option('category-id') ? (int) $this->option('category-id') : null,
            'sort' => $this->option('sort') ? (string) $this->option('sort') : null,
            'min_increase' => (int) $this->option('min-increase'),
        ];

        try {
            $result = $service->generateFromTrending($options);
        } catch (Throwable $e) {
            $this->error('Bulk generation failed: ' . $e->getMessage());

            return self::FAILURE;
        }

        $this->newLine();
        $this->info("Generated {$result['generated']} blog post(s) from trending topics.");
        $this->newLine();

        $rows = collect($result['posts'])->map(fn ($post) => [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'status' => $post->status,
        ])->all();

        if ($rows !== []) {
            $this->table(['ID', 'Title', 'Slug', 'Status'], $rows);
        } else {
            $this->warn('No posts were generated.');
        }

        return self::SUCCESS;
    }
}

