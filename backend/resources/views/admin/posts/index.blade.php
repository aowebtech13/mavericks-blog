@extends('admin.layout')

@section('title', 'Posts')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">Posts</h1>
        <a href="{{ route('admin.posts.create') }}" class="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple w-full sm:w-auto">
            ✏️ New Post
        </a>
    </div>

    <div class="rounded-xl border border-white/10 bg-night-800/60 p-4 md:p-6 mb-6">
        <form action="{{ route('admin.posts.index') }}" method="GET" class="flex flex-col md:flex-row md:flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
                <input type="text" name="search" value="{{ $search }}" placeholder="Search title or content..." class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-slate-600">
            </div>

            <select name="status" class="w-full md:w-auto rounded-lg border border-white/10 bg-night-950 px-4 py-2 text-base text-white transition focus:border-accent focus:outline-none">
                <option value="">All Status</option>
                <option value="draft" {{ $selectedStatus === 'draft' ? 'selected' : '' }}>Draft</option>
                <option value="published" {{ $selectedStatus === 'published' ? 'selected' : '' }}>Published</option>
                <option value="archived" {{ $selectedStatus === 'archived' ? 'selected' : '' }}>Archived</option>
            </select>

            <select name="category" class="w-full md:w-auto rounded-lg border border-white/10 bg-night-950 px-4 py-2 text-base text-white transition focus:border-accent focus:outline-none">
                <option value="">All Categories</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ $selectedCategory == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>

            <div class="flex gap-3">
                <button type="submit" class="flex-1 md:flex-none rounded-lg bg-accent px-6 py-2 text-base font-semibold text-white transition hover:bg-accent-purple">
                    Filter
                </button>
                
                @if($search || $selectedStatus || $selectedCategory)
                    <a href="{{ route('admin.posts.index') }}" class="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white transition flex items-center justify-center">
                        Clear
                    </a>
                @endif
            </div>
        </form>
    </div>

    <div class="rounded-xl border border-white/10 bg-night-800/60 overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full min-w-[640px]">
            <thead class="border-b border-white/10 bg-night-900/60">
                <tr>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 w-10">ID</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400">Title</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 hidden lg:table-cell">Category</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 hidden xl:table-cell">Author</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400">Status</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 hidden xl:table-cell">Views</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 hidden md:table-cell">Created</th>
                    <th class="px-4 py-3.5 text-center text-sm font-semibold text-slate-400">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
                @forelse($posts as $post)
                    <tr class="transition hover:bg-white/5">
                        <td class="px-4 py-3.5 text-sm text-slate-500 font-mono">{{ $post->id }}</td>
                        <td class="px-4 py-3.5 font-medium text-white">{{ $post->title }}</td>
                        <td class="px-4 py-3.5 hidden lg:table-cell">
                            @if($post->category)
                                <span class="inline-block rounded px-2 py-1 text-xs font-medium text-white" style="background-color: {{ $post->category->color }}20">
                                    {{ $post->category->name }}
                                </span>
                            @else
                                <span class="text-slate-500">-</span>
                            @endif
                        </td>
                        <td class="px-4 py-3.5 hidden xl:table-cell text-slate-400">{{ $post->user->name }}</td>
                        <td class="px-4 py-3.5">
                            <span class="inline-block rounded-full px-3 py-1 text-xs font-medium {{ $post->status === 'published' ? 'bg-green-500/10 text-green-300' : ($post->status === 'draft' ? 'bg-yellow-500/10 text-yellow-300' : 'bg-red-500/10 text-red-300') }}">
                                {{ ucfirst($post->status) }}
                            </span>
                        </td>
                        <td class="px-4 py-3.5 hidden xl:table-cell text-slate-400">{{ $post->views_count }}</td>
                        <td class="px-4 py-3.5 hidden md:table-cell text-slate-400 text-sm">{{ $post->created_at->format('M d, Y') }}</td>
                        <td class="px-4 py-3.5 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <a href="{{ route('admin.posts.edit', $post) }}" class="text-accent hover:text-white font-medium text-sm">Edit</a>
                                <form action="{{ route('admin.posts.destroy', $post) }}" method="POST" style="display: inline;" onsubmit="return confirm('Delete this post?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8" class="px-6 py-8 text-center text-slate-500">No posts found</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        </div>
    </div>

    <div class="mt-6">
        {{ $posts->links() }}
    </div>
</div>
@endsection

