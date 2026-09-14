<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;

class ClearAiTags extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blog:clear-ai-tags';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Detach all tags from AI-generated posts.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $posts = Post::where('ai_generated', true)->with('tags')->get();

        $count = 0;
        foreach ($posts as $post) {
            if ($post->tags->isNotEmpty()) {
                $post->tags()->detach();
                $count++;
            }
        }

        $this->info("Detached tags from {$count} AI-generated post(s).");

        return self::SUCCESS;
    }
}
