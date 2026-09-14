@extends('admin.layout')

@section('title', 'AI Writer')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">🤖 AI Writer</h1>
    </div>

    @if ($errors->has('ai'))
        <div class="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {{ $errors->first('ai') }}
        </div>
    @endif

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {{-- Generation form --}}
        <div class="lg:col-span-2">
            <form action="{{ route('admin.ai-writer.generate') }}" method="POST" class="rounded-xl border border-white/10 bg-night-800/60 p-4 md:p-8 space-y-6">
                @csrf

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-slate-400">Topic *</label>
                    <textarea
                        name="topic"
                        rows="3"
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-slate-600"
                        placeholder="e.g. How AI is transforming customer support in 2025"
                        required
                    >{{ old('topic') }}</textarea>
                    @error('topic') <span class="text-red-400 text-sm">{{ $message }}</span> @enderror
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-slate-400">Provider</label>
                        <select name="provider" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none">
                            @foreach($providers as $provider)
                                <option value="{{ $provider }}" {{ old('provider', 'mock') === $provider ? 'selected' : '' }}>{{ ucfirst($provider) }}</option>
                            @endforeach
                        </select>
                        <p class="text-xs text-slate-500 mt-1">mock works without an API key</p>
                    </div>

                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-slate-400">Model</label>
                        <input
                            type="text"
                            name="model"
                            value="{{ old('model') }}"
                            class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                            placeholder="Optional - provider default"
                        >
                        <p class="text-xs text-slate-500 mt-1">e.g. gpt-4o-mini, gemini-1.5-flash</p>
                    </div>

                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-slate-400">Tone</label>
                        <select name="tone" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none">
                            @foreach(['professional', 'conversational', 'inspirational', 'technical', 'friendly'] as $tone)
                                <option value="{{ $tone }}" {{ old('tone', 'professional') === $tone ? 'selected' : '' }}>{{ ucfirst($tone) }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-slate-400">Language</label>
                        <input
                            type="text"
                            name="language"
                            value="{{ old('language', 'en') }}"
                            class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                        <p class="text-xs text-slate-500 mt-1">e.g. en, es, fr, de</p>
                    </div>

                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-slate-400">Approx. Word Count</label>
                        <input
                            type="number"
                            name="word_count"
                            min="300"
                            max="4000"
                            value="{{ old('word_count', 800) }}"
                            class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                    </div>

                    <div>
                        <label class="mb-1.5 block text-sm font-medium text-slate-400">Category</label>
                        <select name="category_id" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none">
                            <option value="">Select Category</option>
                            @foreach($categories as $category)
                                <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-slate-400">Keywords (comma separated)</label>
                    <input
                        type="text"
                        name="keywords"
                        value="{{ old('keywords') }}"
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        placeholder="ai, automation, productivity"
                    >
                </div>

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-slate-400">Publish Options</label>
                    <div class="flex flex-wrap gap-6">
                        <label class="flex items-center">
                            <input type="radio" name="status" value="draft" class="h-4 w-4 border-white/10 bg-night-950 text-accent focus:ring-accent" {{ old('status', 'draft') === 'draft' ? 'checked' : '' }}>
                            <span class="ml-2 text-slate-300">Save as Draft</span>
                        </label>
                        <label class="flex items-center">
                            <input type="radio" name="status" value="published" class="h-4 w-4 border-white/10 bg-night-950 text-accent focus:ring-accent" {{ old('status') === 'published' ? 'checked' : '' }}>
                            <span class="ml-2 text-slate-300">Publish Immediately</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label class="mb-1.5 block text-sm font-medium text-slate-400">Schedule</label>
                    <input
                        type="datetime-local"
                        name="scheduled_at"
                        value="{{ old('scheduled_at') }}"
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                    <p class="text-xs text-slate-500 mt-1">Leave empty to save as draft immediately.</p>
                </div>

                <div class="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                    <button type="submit" class="rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple">
                        ✨ Generate Blog Post
                    </button>
                    <label class="flex items-center gap-2 text-sm text-slate-400">
                        <input type="checkbox" name="async" value="1" class="h-4 w-4 rounded border-white/10 bg-night-950 text-accent focus:ring-accent">
                        Generate in background (queue)
                    </label>
                </div>
            </form>
        </div>

        {{-- Recent generations --}}
        <div>
            <div class="rounded-xl border border-white/10 bg-night-800/60 p-4 md:p-6">
                <h2 class="text-lg font-bold text-white mb-4">Recent Generations</h2>
                <div class="space-y-3">
                    @forelse($generations as $generation)
                        <div class="rounded-lg bg-night-900/60 p-3">
                            <div class="flex items-center justify-between gap-2">
                                <p class="truncate font-medium text-white text-sm">{{ $generation->topic ?? 'Untitled' }}</p>
                                <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium
                                    {{ $generation->status === 'success' ? 'bg-green-500/10 text-green-300' : ($generation->status === 'failed' ? 'bg-red-500/10 text-red-300' : 'bg-yellow-500/10 text-yellow-300') }}">
                                    {{ ucfirst($generation->status) }}
                                </span>
                            </div>
                            <p class="text-xs text-slate-500 mt-1">
                                {{ ucfirst($generation->provider) }} · {{ $generation->model }}
                                · {{ $generation->created_at->diffForHumans() }}
                            </p>
                            @if($generation->post)
                                <a href="{{ route('admin.posts.edit', $generation->post) }}" class="mt-2 inline-block text-xs text-accent transition hover:text-white">
                                    View post →
                                </a>
                            @endif
                            @if($generation->error)
                                <p class="mt-1 text-xs break-words text-red-400">{{ $generation->error }}</p>
                            @endif
                        </div>
                    @empty
                        <p class="text-sm text-slate-500">No generations yet.</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>

    {{-- Trending Topics panel --}}
    <div class="mt-8">
        <div class="rounded-xl border border-white/10 bg-night-800/60 p-4 md:p-8">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 class="text-lg md:text-xl font-bold text-white">📈 Trending Topics</h2>
                    <p class="text-sm text-slate-500 mt-1">
                        Google search interest &amp; increase data for content-creation queries. Generate posts from these topics.
                    </p>
                </div>
                <form action="{{ route('admin.ai-writer.trending.batch') }}" method="POST" class="flex flex-wrap items-center gap-3">
                    @csrf
                    <label class="text-sm text-slate-400">Generate top
                        <select name="limit" class="ml-1 rounded-lg border border-white/10 bg-night-950 px-2 py-1.5 text-sm text-white">
                            @foreach([5, 10, 20, 30, 50] as $n)
                                <option value="{{ $n }}" {{ old('limit', 10) == $n ? 'selected' : '' }}>{{ $n }}</option>
                            @endforeach
                        </select>
                        topics</label>
                    <button type="submit" class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-purple">
                        ⚡ Bulk Generate
                    </button>
                </form>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full min-w-[560px] text-sm">
                    <thead>
                        <tr class="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
                            <th class="py-3 pr-4">#</th>
                            <th class="py-3 pr-4">Query</th>
                            <th class="py-3 pr-4 text-right">Search Interest</th>
                            <th class="py-3 pr-4 text-right">Increase %</th>
                            <th class="py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($trendingTopics as $index => $topic)
                            <tr class="border-b border-white/5 transition hover:bg-white/5">
                                <td class="py-2.5 pr-4 text-slate-500">{{ $index + 1 }}</td>
                                <td class="py-2.5 pr-4 text-slate-300">{{ $topic['query'] }}</td>
                                <td class="py-2.5 pr-4 text-right">
                                    <span class="inline-block min-w-[3rem] rounded-full px-2 py-0.5 text-xs font-semibold
                                        {{ ($topic['search_interest'] ?? 0) >= 50 ? 'bg-green-500/10 text-green-300' : (($topic['search_interest'] ?? 0) >= 10 ? 'bg-yellow-500/10 text-yellow-300' : 'bg-white/5 text-slate-400') }}">
                                        {{ $topic['search_interest'] ?? 0 }}
                                    </span>
                                </td>
                                <td class="py-2.5 pr-4 text-right">
                                    @if (($topic['increase_percent'] ?? 0) === 'Breakout')
                                        <span class="inline-block rounded-full bg-accent-purple/15 px-2 py-0.5 text-xs font-semibold text-accent-purple">Breakout</span>
                                    @else
                                        <span class="inline-block rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                                            +{{ $topic['increase_percent'] ?? 0 }}%
                                        </span>
                                    @endif
                                </td>
                                <td class="py-2.5 text-right">
                                    <form action="{{ route('admin.ai-writer.trending.generate') }}" method="POST">
                                        @csrf
                                        <input type="hidden" name="topic" value="{{ $topic['query'] }}">
                                        <input type="hidden" name="provider" value="{{ old('provider', 'mock') }}">
                                        <button type="submit" class="text-accent transition hover:text-white text-xs font-medium">
                                            Generate →
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="py-6 text-center text-slate-500">No trending topics configured.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection

