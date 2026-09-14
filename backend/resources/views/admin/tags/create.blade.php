@extends('admin.layout')

@section('title', 'New Tag')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">New Tag</h1>
        <a href="{{ route('admin.tags.index') }}" class="text-slate-400 hover:text-white font-medium transition flex items-center">
            ← Back to List
        </a>
    </div>

    <div class="rounded-xl border border-white/10 bg-night-800/60 overflow-hidden">
        <form action="{{ route('admin.tags.store') }}" method="POST" class="p-4 md:p-8 space-y-6">
            @csrf

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="mb-1.5 block text-sm font-semibold text-slate-400">Tag Name</label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g., PHP" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div>
                    <label for="slug" class="mb-1.5 block text-sm font-semibold text-slate-400">Slug (optional)</label>
                    <input type="text" name="slug" id="slug" value="{{ old('slug') }}" placeholder="e.g., php" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>
            </div>

            <div class="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                <a href="{{ route('admin.tags.index') }}" class="px-6 py-2 text-slate-400 hover:text-white font-medium transition">Cancel</a>
                <button type="submit" class="rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple">
                    Create Tag
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
