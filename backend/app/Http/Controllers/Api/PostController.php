<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use App\Services\ViewTracker;

use App\Http\Resources\PostResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 15);
        $status = $request->input('status');
        $category = $request->input('category');
        $tag = $request->input('tag');
        $all = $request->input('all');
        $search = $request->input('q');
        $country = $request->input('country');
        $userId = $request->user()?->id;

        $version = Cache::rememberForever('posts_version', fn() => time());
        $cacheKey = "posts_index_v{$version}_{$page}_{$perPage}_{$status}_{$category}_{$tag}_{$all}_{$search}_{$country}_{$userId}";

        // views_count is deliberately left out of the cached payload so the
        // list always shows live numbers (see refreshViewCounts below).
        $posts = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($request, $userId, $search, $country) {
            $query = Post::query()->select(['id', 'user_id', 'category_id', 'title', 'slug', 'excerpt', 'featured_image', 'status', 'visibility', 'published_at', 'created_at', 'updated_at', 'country']);

            if ($userId) {
                if (!$request->input('all')) {
                    $query->where('user_id', $userId);
                }
            } else {
                $query->where('status', 'published')->where('visibility', 'public');
            }

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                });
            }

            if ($request->input('status')) {
                $query->where('status', $request->input('status'));
            }

            if ($request->input('category')) {
                $query->where('category_id', $request->input('category'));
            }

            if ($country) {
                $query->where('country', $country);
            }

            if ($request->input('tag')) {
                $tag = $request->input('tag');
                $query->whereHas('tags', function ($q) use ($tag) {
                    if (is_numeric($tag)) {
                        $q->where('tags.id', $tag);
                    } else {
                        $q->where('tags.slug', $tag);
                    }
                });
            }

            return $query->with(['user', 'category', 'tags'])
                ->orderByDesc('published_at')
                ->orderByDesc('id')
                ->paginate($request->input('per_page', 15));
        });

        $this->refreshViewCounts($posts);

        return PostResource::collection($posts);
    }

    public function show(Post $post)
    {
        $cacheKey = "post_show_{$post->id}";

        // Reading a post must never bump the counter: this endpoint is also
        // hit by server-side metadata generation and by prefetching, which
        // would inflate the numbers. Views are recorded by trackView() only.
        $postData = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($post) {
            return $post->load(['user', 'category', 'tags']);
        });

        $postData->views_count = app(ViewTracker::class)->currentCount($post);

        return new PostResource($postData);
    }

    /**
     * Record a genuine page view for a post.
     *
     * Called from the browser once per post page render. De-duplicated per
     * visitor within the configured window, so reloads and router prefetches
     * do not double count.
     */
    public function trackView(Request $request, Post $post)
    {
        $views = app(ViewTracker::class)->record($post, $request);

        return response()->json([
            'slug' => $post->slug,
            'views_count' => $views,
        ]);
    }

    /**
     * Hydrate live view counts onto a (possibly cached) paginator in one query.
     */
    protected function refreshViewCounts($posts): void
    {
        $items = $posts instanceof \Illuminate\Contracts\Pagination\Paginator
            ? $posts->items()
            : $posts;

        $ids = collect($items)->pluck('id')->filter()->all();

        if (empty($ids)) {
            return;
        }

        $counts = Post::whereIn('id', $ids)
            ->pluck('views_count', 'id');

        foreach ($items as $item) {
            if (isset($counts[$item->id])) {
                $item->views_count = (int) $counts[$item->id];
            }
        }
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:posts,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'nullable|in:draft,published,archived',
            'visibility' => 'nullable|in:public,private,scheduled',
            'published_at' => 'nullable|date',
            'scheduled_at' => 'nullable|date|after:now',
            'country' => 'nullable|string|max:2',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        if ($validated['status'] === 'published' && !$validated['published_at']) {
            $validated['published_at'] = now();
        }

        $post = Post::create($validated);
        
        if (!empty($validated['tags'])) {
            $post->tags()->attach($validated['tags']);
        }

        return (new PostResource($post->load(['user', 'category', 'tags'])))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => 'nullable|string|unique:posts,slug,' . $post->id,
            'excerpt' => 'nullable|string|max:500',
            'content' => 'sometimes|string',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'featured_image' => 'nullable|image|max:2048',
            'status' => 'nullable|in:draft,published,archived',
            'visibility' => 'nullable|in:public,private,scheduled',
            'published_at' => 'nullable|date',
            'scheduled_at' => 'nullable|date|after:now',
            'country' => 'nullable|string|max:2',
        ]);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        if (isset($validated['status']) && $validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        if (isset($validated['tags'])) {
            $post->tags()->sync($validated['tags']);
        }

        return new PostResource($post->load(['user', 'category', 'tags']));
    }

    public function destroy(Post $post): JsonResponse
    {
        $this->authorize('delete', $post);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }

    public function search(Request $request)
    {
        $query = $request->input('q', '');
        $cacheKey = "posts_search_" . md5($query);

        $posts = Cache::remember($cacheKey, now()->addMinutes(15), function () use ($query) {
            return Post::where('status', 'published')
                ->where('visibility', 'public')
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%")
                        ->orWhere('excerpt', 'like', "%{$query}%");
                })
                ->with(['user', 'category', 'tags'])
                ->limit(10)
                ->get();
        });

        return PostResource::collection($posts);
    }

    public function bulk(Request $request): JsonResponse
    {
        $action = $request->input('action');
        $ids = $request->input('ids', []);

        if ($action === 'delete') {
            Post::whereIn('id', $ids)->where('user_id', $request->user()->id)->delete();
        } elseif ($action === 'publish') {
            Post::whereIn('id', $ids)->where('user_id', $request->user()->id)->update([
                'status' => 'published',
                'published_at' => now()
            ]);
        } elseif ($action === 'draft') {
            Post::whereIn('id', $ids)->where('user_id', $request->user()->id)->update(['status' => 'draft']);
        }

        Post::clearCache();

        return response()->json(['message' => 'Action completed']);
    }
}

