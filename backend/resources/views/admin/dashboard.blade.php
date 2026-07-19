@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
<div class="max-w-7xl mx-auto">
    <h1 class="text-4xl font-bold text-slate-800 mb-8">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <p class="text-slate-600 text-sm font-medium">Total Posts</p>
            <p class="text-3xl font-bold text-slate-800 mt-2">{{ \App\Models\Post::count() }}</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
            <p class="text-slate-600 text-sm font-medium">Published Posts</p>
            <p class="text-3xl font-bold text-slate-800 mt-2">{{ \App\Models\Post::where('status', 'published')->count() }}</p>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-slate-800 mb-4">Recent Posts</h2>
        <div class="space-y-3">
            @forelse(\App\Models\Post::latest()->limit(5)->get() as $post)
                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                        <p class="font-medium text-slate-800">{{ $post->title }}</p>
                        <p class="text-sm text-slate-500">{{ $post->created_at->diffForHumans() }}</p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium {{ $post->status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }}">
                        {{ ucfirst($post->status) }}
                    </span>
                </div>
            @empty
                <p class="text-slate-500 text-sm">No posts yet</p>
            @endforelse
        </div>
    </div>
</div>
@endsection
