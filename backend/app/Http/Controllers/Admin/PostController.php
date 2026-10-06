<?php

namespace App\Http\Controllers\Admin;

use App\Models\Media;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query();

        if (!$request->user()->can('viewAll', Post::class)) {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->input('category'));
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('content', 'LIKE', "%{$search}%")
                  ->orWhere('excerpt', 'LIKE', "%{$search}%");
            });
        }

        $sort = $request->input('sort', 'latest');
        $direction = $request->input('direction') === 'asc' ? 'asc' : 'desc';

        $query = match ($sort) {
            'views' => $query->orderBy('views_count', $direction)->orderByDesc('id'),
            'title' => $query->orderBy('title', $direction),
            'oldest' => $query->orderBy('created_at', $direction),
            default => $query->orderByDesc('created_at')->orderByDesc('id'),
        };

        $posts = $query->with(['user', 'category'])
            ->paginate(15)
            ->withQueryString();

        $categories = Category::orderBy('name')->get();

        return view('admin.posts.index', [
            'posts' => $posts,
            'categories' => $categories,
            'selectedStatus' => $request->input('status'),
            'selectedCategory' => $request->input('category'),
            'search' => $request->input('search'),
            'sort' => $sort,
            'direction' => $direction,
            'stats' => $this->indexStats($request),
        ]);
    }

    /**
     * Live, un-cached aggregates for the posts screen. The view totals come
     * straight from the posts table so they always reflect real reads.
     */
    protected function indexStats(Request $request)
    {
        $base = Post::query();

        if (!$request->user()->can('viewAll', Post::class)) {
            $base->where('user_id', $request->user()->id);
        }

        return [
            'total' => (clone $base)->count(),
            'published' => (clone $base)->where('status', 'published')->count(),
            'drafts' => (clone $base)->where('status', 'draft')->count(),
            'total_views' => (int) (clone $base)->sum('views_count'),
        ];
    }

    public function create()
    {
        return view('admin.posts.create', [
            'categories' => Category::orderBy('name')->get(),
            'tags' => Tag::orderBy('name')->get(),
            'countries' => config('countries'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:posts,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'featured_image_id' => 'nullable|exists:media,id',
            'status' => 'in:draft,published,archived',
            'visibility' => 'in:public,private,scheduled',
            'published_at' => 'nullable|date',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'country' => 'nullable|string|max:2',
        ], [
            'category_id.required' => 'Please select a category before submitting.',
            'category_id.exists' => 'The selected category does not exist.',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        } elseif ($request->filled('featured_image_id')) {
            $media = Media::findOrFail($request->input('featured_image_id'));
            $validated['featured_image'] = $media->path;
        }

        if (($validated['status'] ?? null) === 'published' && !($validated['published_at'] ?? null)) {
            $validated['published_at'] = now();
        }

        $post = Post::create($validated);

        if ($request->has('tags')) {
            $post->tags()->sync($request->input('tags'));
        }

        return redirect()->route('admin.posts.edit', $post)
            ->with('success', 'Post created successfully!');
    }

    public function edit(Post $post)
    {
        $this->authorize('update', $post);

        return view('admin.posts.edit', [
            'post' => $post,
            'categories' => Category::orderBy('name')->get(),
            'tags' => Tag::orderBy('name')->get(),
            'countries' => config('countries'),
            'selectedTags' => $post->tags->pluck('id')->toArray(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:posts,slug,' . $post->id,
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:2048',
            'featured_image_id' => 'nullable|exists:media,id',
            'status' => 'in:draft,published,archived',
            'visibility' => 'in:public,private,scheduled',
            'published_at' => 'nullable|date',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'country' => 'nullable|string|max:2',
        ], [
            'category_id.required' => 'Please select a category before submitting.',
            'category_id.exists' => 'The selected category does not exist.',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        } elseif ($request->filled('featured_image_id')) {
            $media = Media::findOrFail($request->input('featured_image_id'));
            $validated['featured_image'] = $media->path;
        }

        if (($validated['status'] ?? null) === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        if ($request->has('tags')) {
            $post->tags()->sync($request->input('tags'));
        } else {
            $post->tags()->sync([]);
        }

        return redirect()->route('admin.posts.edit', $post)
            ->with('success', 'Post updated successfully!');
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();

        return redirect()->route('admin.posts.index')
            ->with('success', 'Post deleted successfully!');
    }
}
