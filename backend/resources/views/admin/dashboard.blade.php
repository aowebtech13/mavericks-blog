@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div class="rounded-xl border border-white/10 bg-night-800/60 p-6">
            <p class="text-sm font-medium text-slate-400">Total Posts</p>
            <p class="text-3xl font-bold text-white mt-2">{{ \App\Models\Post::count() }}</p>
        </div>

        <div class="rounded-xl border border-white/10 bg-night-800/60 p-6">
            <p class="text-sm font-medium text-slate-400">Published Posts</p>
            <p class="text-3xl font-bold text-white mt-2">{{ \App\Models\Post::where('status', 'published')->count() }}</p>
        </div>
    </div>

    <div class="rounded-xl border border-white/10 bg-night-800/60 p-6">
        <h2 class="text-xl font-bold text-white mb-4">Recent Posts</h2>
        <div class="space-y-3">
            @forelse(\App\Models\Post::latest()->limit(5)->get() as $post)
                <div class="flex items-center justify-between rounded-lg bg-night-900/60 p-3">
                    <div class="min-w-0 pr-3">
                        <p class="truncate font-medium text-white">{{ $post->title }}</p>
                        <p class="text-sm text-slate-500">{{ $post->created_at->diffForHumans() }}</p>
                    </div>
                    <span class="shrink-0 rounded-full px-3 py-1 text-xs font-medium {{ $post->status === 'published' ? 'bg-green-500/10 text-green-300' : 'bg-yellow-500/10 text-yellow-300' }}">
                        {{ ucfirst($post->status) }}
                    </span>
                </div>
            @empty
                <p class="text-sm text-slate-500">No posts yet</p>
            @endforelse
        </div>
    </div>
</div>
@endsection

