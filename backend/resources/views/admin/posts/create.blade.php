@extends('admin.layout')

@section('title', 'Create Post')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-8">
        <a href="{{ route('admin.posts.index') }}" class="text-accent hover:text-white">← Back to Posts</a>
        <h1 class="text-2xl lg:text-3xl font-bold text-white mt-2">Create New Post</h1>
    </div>

    <form action="{{ route('admin.posts.store') }}" method="POST" enctype="multipart/form-data" class="rounded-xl border border-white/10 bg-night-800/60 p-4 md:p-8 space-y-6">
        @csrf

        <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-400">Title</label>
            <input type="text" name="title" value="{{ old('title') }}" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Enter post title" required>
            @error('title') <span class="text-red-400 text-sm">{{ $message }}</span> @enderror
        </div>

        <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-400">Slug</label>
            <input type="text" name="slug" value="{{ old('slug') }}" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Optional - auto-generated from title">
            @error('slug') <span class="text-red-400 text-sm">{{ $message }}</span> @enderror
        </div>

        <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-400">Excerpt</label>
            <textarea name="excerpt" rows="2" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Brief summary of the post">{{ old('excerpt') }}</textarea>
            @error('excerpt') <span class="text-red-400 text-sm">{{ $message }}</span> @enderror
        </div>

        <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-400">Content</label>
            <textarea name="content" rows="50" class="rich-text w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Full post content">{{ old('content') }}</textarea>
            @error('content') <span class="text-red-400 text-sm">{{ $message }}</span> @enderror
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label class="mb-1.5 block text-sm font-medium text-slate-400">Category</label>
                <select name="category_id" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none">
                    <option value="">Select Category</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="mb-1.5 block text-sm font-medium text-slate-400">Status</label>
                <select name="status" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none" required>
                    <option value="draft" {{ old('status') === 'draft' ? 'selected' : '' }}>Draft</option>
                    <option value="published" {{ old('status') === 'published' ? 'selected' : '' }}>Published</option>
                    <option value="archived" {{ old('status') === 'archived' ? 'selected' : '' }}>Archived</option>
                </select>
            </div>
        </div>

        <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-400">Tags</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto rounded-lg border border-white/10 p-4">
                @foreach($tags as $tag)
                    <label class="flex items-center rounded-md p-1.5 transition hover:bg-white/5">
                        <input type="checkbox" name="tags[]" value="{{ $tag->id }}" class="h-4 w-4 rounded border-white/10 bg-night-950 text-accent focus:ring-accent">
                        <span class="ml-2 text-slate-300">{{ $tag->name }}</span>
                    </label>
                @endforeach
            </div>
        </div>

        <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-400">Featured Image</label>
            <div id="image-preview" class="mb-3 hidden">
                <img src="" alt="Preview" class="h-32 rounded-lg object-cover">
            </div>
            <input type="file" name="featured_image" id="featured_image" accept="image/*" class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/20 transition focus:border-accent focus:outline-none">
            @error('featured_image') <span class="text-red-400 text-sm">{{ $message }}</span> @enderror
        </div>

        <div class="flex gap-4 pt-4 border-t border-white/10">
            <button type="submit" class="rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple">
                Create Post
            </button>
            <a href="{{ route('admin.posts.index') }}" class="rounded-lg border border-white/10 px-6 py-2.5 text-slate-300 transition hover:text-white">
                Cancel
            </a>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
    // Slug generator
    const titleInput = document.querySelector('input[name="title"]');
    const slugInput = document.querySelector('input[name="slug"]');

    titleInput.addEventListener('input', function() {
        if (!slugInput.dataset.edited) {
            slugInput.value = this.value
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
    });

    slugInput.addEventListener('input', function() {
        this.dataset.edited = true;
    });

    // Image preview
    const imageInput = document.getElementById('featured_image');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = imagePreview.querySelector('img');

    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imagePreview.classList.remove('hidden');
            }
            reader.readAsDataURL(file);
        } else {
            imagePreview.classList.add('hidden');
        }
    });
</script>
@endpush

