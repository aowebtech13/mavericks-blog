@extends('admin.layout')

@section('title', 'Edit Category: ' . $category->name)

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-slate-800">Edit Category</h1>
        <a href="{{ route('admin.categories.index') }}" class="text-slate-500 hover:text-slate-800 font-medium transition flex items-center">
            ← Back to List
        </a>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <form action="{{ route('admin.categories.update', $category) }}" method="POST" class="p-8 space-y-6">
            @csrf
            @method('PUT')

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="block text-sm font-semibold text-slate-700 mb-2">Category Name</label>
                    <input type="text" name="name" id="name" value="{{ old('name', $category->name) }}" required placeholder="e.g., Technology" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                </div>

                <div>
                    <label for="slug" class="block text-sm font-semibold text-slate-700 mb-2">Slug (optional)</label>
                    <input type="text" name="slug" id="slug" value="{{ old('slug', $category->slug) }}" placeholder="e.g., technology" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="color" class="block text-sm font-semibold text-slate-700 mb-2">Color (Hex code)</label>
                    <div class="flex items-center gap-2">
                        <input type="color" name="color_picker" id="color_picker" value="{{ old('color', $category->color ?? '#3b82f6') }}" class="h-10 w-10 p-0 border border-slate-300 rounded overflow-hidden">
                        <input type="text" name="color" id="color" value="{{ old('color', $category->color ?? '#3b82f6') }}" placeholder="#3b82f6" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono text-sm">
                    </div>
                </div>
            </div>

            <div>
                <label for="description" class="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea name="description" id="description" rows="4" placeholder="Brief description of this category..." class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">{{ old('description', $category->description) }}</textarea>
            </div>

            <div class="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <a href="{{ route('admin.categories.index') }}" class="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium transition">Cancel</a>
                <button type="submit" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition">
                    Update Category
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
