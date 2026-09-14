<?php

namespace Tests\Feature;

use App\Models\AiGeneration;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AiWriterTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_ai_writer_page(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->get(route('admin.ai-writer.index'));

        $response->assertOk();
        $response->assertSee('AI Writer');
    }

    public function test_generate_blog_post_via_mock_provider(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::create([
            'name' => 'AI',
            'slug' => 'ai',
        ]);

        $response = $this->actingAs($admin)->post(route('admin.ai-writer.generate'), [
            'topic' => 'The future of artificial intelligence in business',
            'provider' => 'mock',
            'tone' => 'professional',
            'category_id' => $category->id,
            'status' => 'draft',
        ]);

        $response->assertRedirect();

        $post = Post::where('ai_generated', true)->first();

        $this->assertNotNull($post);
        $this->assertSame('draft', $post->status);
        $this->assertTrue($post->ai_generated);
        $this->assertNotEmpty($post->content);
        $this->assertNotEmpty($post->title);

        $this->assertDatabaseHas('ai_generations', [
            'provider' => 'mock',
            'status' => 'success',
            'post_id' => $post->id,
        ]);
    }

    public function test_api_generate_blog_post_requires_authentication(): void
    {
        $this->postJson('/api/ai/writer/generate', [
            'topic' => 'Unauthenticated request',
        ])->assertUnauthorized();
    }

    public function test_api_generate_blog_post_with_token(): void
    {
        $user = User::factory()->create();
        Category::create(['name' => 'Tech', 'slug' => 'tech']);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/ai/writer/generate', [
                'topic' => 'API generated article on automation',
                'provider' => 'mock',
            ]);

        $response->assertCreated();
        $response->assertJsonPath('data.ai_generated', true);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'slug',
                'content',
                'ai_generated',
            ],
        ]);
    }

    public function test_api_generations_history(): void
    {
        $user = User::factory()->create();
        AiGeneration::create([
            'user_id' => $user->id,
            'provider' => 'mock',
            'model' => 'mock-1',
            'topic' => 'Test history',
            'prompt' => 'Write about test history',
            'status' => 'success',
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/ai/writer/generations');

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.topic', 'Test history');
    }

    public function test_generation_requires_topic(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->post(route('admin.ai-writer.generate'), [
            'provider' => 'mock',
        ]);

        $response->assertSessionHasErrors('topic');
    }

    public function test_trending_topics_available_from_config(): void
    {
        $topics = config('ai_topics.topics');

        $this->assertNotEmpty($topics);
        $this->assertGreaterThanOrEqual(50, count($topics));

        $first = $topics[0];
        $this->assertArrayHasKey('query', $first);
        $this->assertArrayHasKey('search_interest', $first);
        $this->assertArrayHasKey('increase_percent', $first);
    }

    public function test_generate_single_trending_topic(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        Category::create(['name' => 'AI', 'slug' => 'ai']);

        $topics = config('ai_topics.topics');
        $topic = $topics[0];

        $response = $this->actingAs($admin)->post(route('admin.ai-writer.trending.generate'), [
            'topic' => $topic['query'],
            'provider' => 'mock',
            'status' => 'draft',
        ]);

        $response->assertRedirect();

        $post = Post::where('ai_generated', true)->first();

        $this->assertNotNull($post);
        $this->assertStringContainsString('Why This Is Trending', $post->content);
        $this->assertNotEmpty($post->title);
    }

    public function test_generate_trending_batch(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        Category::create(['name' => 'AI', 'slug' => 'ai']);

        $response = $this->actingAs($admin)->post(route('admin.ai-writer.trending.batch'), [
            'limit' => 5,
            'provider' => 'mock',
            'status' => 'draft',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('posts', [
            'ai_generated' => true,
        ]);

        $this->assertGreaterThanOrEqual(5, Post::where('ai_generated', true)->count());
    }

    public function test_trending_batch_respects_limit(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        Category::create(['name' => 'AI', 'slug' => 'ai']);

        $response = $this->actingAs($admin)->post(route('admin.ai-writer.trending.batch'), [
            'limit' => 3,
            'provider' => 'mock',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertSame(3, Post::where('ai_generated', true)->count());
    }

    public function test_trending_page_displays_topics(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->get(route('admin.ai-writer.index'));

        $response->assertOk();
        $response->assertSee('Trending Legal Topics');
        $response->assertSee('constitutional law');
    }
}

