@extends('admin.layout')

@section('title', 'Posts')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-slate-800">Posts</h1>
        <a href="{{ route('admin.posts.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
            ✏️ New Post
        </a>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <form action="{{ route('admin.posts.index') }}" method="GET" class="flex flex-wrap gap-4">
            <div class="flex-1 min-w-[200px]">
                <input type="text" name="search" value="{{ $search }}" placeholder="Search title or content..." class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
            </div>

            <select name="status" class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700">
                <option value="">All Status</option>
                <option value="draft" {{ $selectedStatus === 'draft' ? 'selected' : '' }}>Draft</option>
                <option value="published" {{ $selectedStatus === 'published' ? 'selected' : '' }}>Published</option>
                <option value="archived" {{ $selectedStatus === 'archived' ? 'selected' : '' }}>Archived</option>
            </select>

            <select name="category" class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700">
                <option value="">All Categories</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}" {{ $selectedCategory == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>

            <button type="submit" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                Filter
            </button>
            
            @if($search || $selectedStatus || $selectedCategory)
                <a href="{{ route('admin.posts.index') }}" class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition flex items-center">
                    Clear
                </a>
            @endif
        </form>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
            <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700 w-12">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Author</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Views</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Created</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
                @forelse($posts as $post)
                    <tr class="hover:bg-slate-50 transition">
                        <td class="px-6 py-4 text-slate-400 font-mono text-xs">{{ $post->id }}</td>
                        <td class="px-6 py-4 text-slate-800 font-medium">{{ $post->title }}</td>
                        <td class="px-6 py-4 text-slate-600">
                            @if($post->category)
                                <span class="inline-block px-2 py-1 rounded text-xs font-medium" style="background-color: {{ $post->category->color }}20; color: {{ $post->category->color }}">
                                    {{ $post->category->name }}
                                </span>
                            @else
                                <span class="text-slate-400">-</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 text-slate-600">{{ $post->user->name }}</td>
                        <td class="px-6 py-4">
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium {{ $post->status === 'published' ? 'bg-green-100 text-green-700' : ($post->status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700') }}">
                                {{ ucfirst($post->status) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-slate-600">{{ $post->views_count }}</td>
                        <td class="px-6 py-4 text-slate-600 text-sm">{{ $post->created_at->format('M d, Y') }}</td>
                        <td class="px-6 py-4 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <a href="{{ route('admin.posts.edit', $post) }}" class="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</a>
                                <form action="{{ route('admin.posts.destroy', $post) }}" method="POST" style="display: inline;" onsubmit="return confirm('Delete this post?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button>
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

    <div class="mt-6">
        {{ $posts->links() }}
    </div>
</div>
@endsection
