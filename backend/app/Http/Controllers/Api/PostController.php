<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

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
        $userId = $request->user()?->id;

        $version = Cache::rememberForever('posts_version', fn() => time());
        $cacheKey = "posts_index_v{$version}_{$page}_{$perPage}_{$status}_{$category}_{$tag}_{$all}_{$search}_{$userId}";

        $posts = Cache::remember($cacheKey, now()->addMinutes(30), function () use ($request, $userId, $search) {
            $query = Post::query()->select(['id', 'user_id', 'category_id', 'title', 'slug', 'excerpt', 'featured_image', 'status', 'visibility', 'published_at', 'created_at', 'updated_at', 'views_count']);

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

        return PostResource::collection($posts);
    }

    public function show(Post $post)
    {
        $cacheKey = "post_show_{$post->id}";

        $postData = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($post) {
            return $post->load(['user', 'category', 'tags']);
        });

        $post->increment('views_count');

        return new PostResource($postData);
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

