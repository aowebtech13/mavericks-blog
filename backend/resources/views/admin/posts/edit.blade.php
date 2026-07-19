@extends('admin.layout')

@section('title', 'Edit Post')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="mb-8">
        <div class="flex items-center justify-between">
            <a href="{{ route('admin.posts.index') }}" class="text-blue-600 hover:text-blue-700">← Back to Posts</a>
            <span class="text-slate-400 font-mono text-sm">Post ID: {{ $post->id }}</span>
        </div>
        <h1 class="text-4xl font-bold text-slate-800 mt-2">Edit Post</h1>
    </div>

    <form action="{{ route('admin.posts.update', $post) }}" method="POST" enctype="multipart/form-data" class="bg-white rounded-lg shadow-md p-8 space-y-6">
        @csrf
        @method('PUT')

        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input type="text" name="title" value="{{ old('title', $post->title) }}" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Enter post title" required>
            @error('title') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Slug</label>
            <input type="text" name="slug" value="{{ old('slug', $post->slug) }}" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Optional - auto-generated from title">
            @error('slug') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Excerpt</label>
            <textarea name="excerpt" rows="2" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Brief summary of the post">{{ old('excerpt', $post->excerpt) }}</textarea>
            @error('excerpt') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
        </div>

        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Content</label>
            <textarea name="content" rows="10" class="rich-text w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Full post content">{{ old('content', $post->content) }}</textarea>
            @error('content') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
        </div>

        <div class="grid grid-cols-2 gap-6">
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select name="category_id" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="">Select Category</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', $post->category_id) == $category->id ? 'selected' : '' }}>{{ $category->name }}</option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select name="status" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                    <option value="draft" {{ old('status', $post->status) === 'draft' ? 'selected' : '' }}>Draft</option>
                    <option value="published" {{ old('status', $post->status) === 'published' ? 'selected' : '' }}>Published</option>
                    <option value="archived" {{ old('status', $post->status) === 'archived' ? 'selected' : '' }}>Archived</option>
                </select>
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Tags</label>
            <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-slate-300 rounded-lg p-4">
                @foreach($tags as $tag)
                    <label class="flex items-center">
                        <input type="checkbox" name="tags[]" value="{{ $tag->id }}" class="w-4 h-4 text-blue-600" {{ in_array($tag->id, $selectedTags) ? 'checked' : '' }}>
                        <span class="ml-2 text-slate-700">{{ $tag->name }}</span>
                    </label>
                @endforeach
            </div>
        </div>

        <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Featured Image</label>
            <div id="image-preview" class="mb-3 {{ $post->featured_image ? '' : 'hidden' }}">
                <img src="{{ $post->featured_image ? asset('storage/' . $post->featured_image) : '' }}" alt="{{ $post->title }}" class="h-32 rounded-lg object-cover">
            </div>
            <input type="file" name="featured_image" id="featured_image" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500">
            @error('featured_image') <span class="text-red-500 text-sm">{{ $message }}</span> @enderror
        </div>

        <div class="grid grid-cols-3 gap-6">
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Views</label>
                <div class="px-4 py-2 bg-slate-100 rounded-lg text-slate-700">{{ $post->views_count }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Comments</label>
                <div class="px-4 py-2 bg-slate-100 rounded-lg text-slate-700">{{ $post->comments_count }}</div>
            </div>
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">Published</label>
                <div class="px-4 py-2 bg-slate-100 rounded-lg text-slate-700">{{ $post->published_at?->format('M d, Y') ?? 'Not published' }}</div>
            </div>
        </div>

        <div class="flex gap-4 pt-4 border-t border-slate-200">
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                Update Post
            </button>
            <a href="{{ route('admin.posts.index') }}" class="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition">
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
        }
    });
</script>
@endpush
