<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tag;
use App\Models\Post;
// use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        // Use predefined names or fetch existing to avoid collisions
        $categoryNames = ['News', 'Events', 'Media', 'Broadcasting', 'Opinion'];
        foreach ($categoryNames as $name) {
            Category::firstOrCreate(
                ['name' => $name],
                [
                    'slug' => Str::slug($name),
                    'description' => "Description for {$name} category",
                    'color' => '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT),
                ]
            );
        }
        $categories = Category::all();

        $tagNames = ['Laravel', 'PHP', 'News', 'Media', 'Primus', 'Broadcast', 'Radio', 'Television', 'Journalism', 'Africa'];
        foreach ($tagNames as $name) {
            Tag::firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name)]
            );
        }
        $tags = Tag::all();

        $users = User::factory()->count(3)->create();

        foreach (range(1, 20) as $i) {
            $post = Post::updateOrCreate(
                ['slug' => "blog-post-{$i}"],
                [
                    'user_id' => $users->random()->id,
                    'category_id' => $categories->random()->id,
                    'title' => "Blog Post {$i}",
                    'excerpt' => "This is a brief excerpt for blog post {$i}",
                    'content' => "This is the full content for blog post {$i}. " . str_repeat("Lorem ipsum dolor sit amet. ", 10),
                    'status' => $i % 3 === 0 ? 'published' : 'draft',
                    'visibility' => 'public',
                    'published_at' => $i % 3 === 0 ? now()->subDays(rand(1, 30)) : null,
                ]
            );

            $post->tags()->sync($tags->random(rand(2, 5)));
        }
    }
}
