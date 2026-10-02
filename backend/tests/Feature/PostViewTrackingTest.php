<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class PostViewTrackingTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    public function test_reading_a_post_does_not_increment_the_view_counter(): void
    {
        $post = Post::factory()->published()->create();

        $this->getJson(route('posts.show', $post->slug))->assertOk();
        $this->getJson(route('posts.show', $post->slug))->assertOk();

        $this->assertSame(0, $post->fresh()->views_count);
    }

    public function test_tracking_endpoint_increments_the_view_counter(): void
    {
        $post = Post::factory()->published()->create();

        $response = $this->withHeaders(['User-Agent' => 'Mozilla/5.0 (Macintosh) Safari/605'])
            ->postJson(route('posts.view', $post->slug));

        $response->assertOk()->assertJson(['slug' => $post->slug, 'views_count' => 1]);

        $this->assertSame(1, $post->fresh()->views_count);
    }

    public function test_repeat_views_from_the_same_visitor_are_de_duplicated(): void
    {
        $post = Post::factory()->published()->create();

        $headers = ['User-Agent' => 'Mozilla/5.0 (Macintosh) Safari/605'];

        $this->withHeaders($headers)->postJson(route('posts.view', $post->slug))->assertOk();
        $this->withHeaders($headers)->postJson(route('posts.view', $post->slug))->assertOk();
        $this->withHeaders($headers)->postJson(route('posts.view', $post->slug))->assertOk();

        $this->assertSame(1, $post->fresh()->views_count);
    }

    public function test_distinct_visitors_each_register_a_view(): void
    {
        $post = Post::factory()->published()->create();

        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.1'])
            ->withHeaders(['User-Agent' => 'Mozilla/5.0 (Macintosh) Safari/605'])
            ->postJson(route('posts.view', $post->slug))
            ->assertOk();

        $this->withServerVariables(['REMOTE_ADDR' => '10.0.0.2'])
            ->withHeaders(['User-Agent' => 'Mozilla/5.0 (Windows) Chrome/120'])
            ->postJson(route('posts.view', $post->slug))
            ->assertOk();

        $this->assertSame(2, $post->fresh()->views_count);
    }

    public function test_bot_traffic_is_not_counted(): void
    {
        $post = Post::factory()->published()->create();

        $this->withHeaders(['User-Agent' => 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'])
            ->postJson(route('posts.view', $post->slug))
            ->assertOk();

        $this->assertSame(0, $post->fresh()->views_count);
    }

    public function test_prefetch_requests_are_not_counted(): void
    {
        $post = Post::factory()->published()->create();

        $this->withHeaders(['User-Agent' => 'Mozilla/5.0 (Macintosh) Safari/605', 'X-Prefetch' => '1'])
            ->postJson(route('posts.view', $post->slug))
            ->assertOk();

        $this->assertSame(0, $post->fresh()->views_count);
    }

    public function test_unpublished_posts_do_not_accumulate_views(): void
    {
        $draft = Post::factory()->create(['status' => 'draft', 'visibility' => 'public']);

        $this->withHeaders(['User-Agent' => 'Mozilla/5.0 (Macintosh) Safari/605'])
            ->postJson(route('posts.view', $draft->slug))
            ->assertOk();

        $this->assertSame(0, $draft->fresh()->views_count);
    }

    public function test_api_list_returns_live_view_counts_not_cached_ones(): void
    {
        $post = Post::factory()->published()->create();

        // Prime the list cache with a zero count.
        $this->getJson(route('posts.index'))->assertOk();

        Post::withoutTimestamps(fn () => $post->newQuery()->whereKey($post->id)->increment('views_count', 7));

        $response = $this->getJson(route('posts.index'));

        $found = collect($response->json('data'))->firstWhere('slug', $post->slug);

        $this->assertNotNull($found);
        $this->assertSame(7, $found['views_count']);
    }

    public function test_admin_index_shows_the_real_view_total(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $post = Post::factory()->published()->create();

        Post::withoutTimestamps(fn () => $post->newQuery()->whereKey($post->id)->increment('views_count', 12));

        $response = $this->actingAs($admin)->get(route('admin.posts.index'));

        $response->assertOk();
        $response->assertSee('12', false);
    }

    public function test_admin_index_can_sort_by_views(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $low = Post::factory()->published()->create(['title' => 'Low views']);
        $high = Post::factory()->published()->create(['title' => 'High views']);

        Post::withoutTimestamps(function () use ($low, $high) {
            $low->newQuery()->whereKey($low->id)->increment('views_count', 3);
            $high->newQuery()->whereKey($high->id)->increment('views_count', 99);
        });

        $response = $this->actingAs($admin)->get(route('admin.posts.index', ['sort' => 'views']));

        $response->assertOk();

        $body = $response->getContent();
        $this->assertLessThan(
            strpos($body, 'High views'),
            strpos($body, 'Low views'),
            'Expected the most-viewed post to be listed first.'
        );
    }
}
