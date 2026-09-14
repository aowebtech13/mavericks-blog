@extends('admin.layout')

@section('title', 'New Category')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">New Category</h1>
        <a href="{{ route('admin.categories.index') }}" class="text-slate-400 hover:text-white font-medium transition flex items-center">
            ← Back to List
        </a>
    </div>

    <div class="rounded-xl border border-white/10 bg-night-800/60 overflow-hidden">
        <form action="{{ route('admin.categories.store') }}" method="POST" class="p-4 md:p-8 space-y-6">
            @csrf

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="mb-1.5 block text-sm font-semibold text-slate-400">Category Name</label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g., Technology" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div>
                    <label for="slug" class="mb-1.5 block text-sm font-semibold text-slate-400">Slug (optional)</label>
                    <input type="text" name="slug" id="slug" value="{{ old('slug') }}" placeholder="e.g., technology" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="color" class="mb-1.5 block text-sm font-semibold text-slate-400">Color (Hex code)</label>
                    <div class="flex items-center gap-2">
                        <input type="color" name="color_picker" id="color_picker" value="{{ old('color', '#3b82f6') }}" class="h-10 w-10 shrink-0 cursor-pointer rounded border border-white/10 bg-night-950 p-0">
                        <input type="text" name="color" id="color" value="{{ old('color', '#3b82f6') }}" placeholder="#3b82f6" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 font-mono text-sm uppercase text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                    </div>
                </div>
            </div>

            <div>
                <label for="description" class="mb-1.5 block text-sm font-semibold text-slate-400">Description</label>
                <textarea name="description" id="description" rows="4" placeholder="Brief description of this category..." class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">{{ old('description') }}</textarea>
            </div>

            <div class="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                <a href="{{ route('admin.categories.index') }}" class="px-6 py-2 text-slate-400 hover:text-white font-medium transition">Cancel</a>
                <button type="submit" class="rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple">
                    Create Category
                </button>
            </div>
        </form>
    </div>
</div>

<script>
    const colorPicker = document.getElementById('color_picker');
    const colorInput = document.getElementById('color');

    colorPicker.addEventListener('input', (e) => {
        colorInput.value = e.target.value.toUpperCase();
    });

    colorInput.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
            colorPicker.value = e.target.value;
        }
    });
</script>
@endsection
