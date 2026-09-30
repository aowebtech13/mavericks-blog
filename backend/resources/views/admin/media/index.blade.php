@extends('admin.layout')

@section('title', 'Media Library')

@section('content')
<div class="max-w-7xl mx-auto">
    {{-- Header --}}
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-white">Media Library</h1>
            <p class="mt-1 text-sm text-slate-400">
                {{ number_format($stats['total']) }} file(s) &middot; {{ number_format($stats['images']) }} image(s) &middot;
                {{ number_format($stats['size'] / 1048576, 1) }} MB total
            </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <form method="POST" action="{{ route('admin.media.sync') }}" class="flex-1 sm:flex-none">
                @csrf
                <button type="submit" class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:bg-white/20 hover:text-white">
                    🔄 Sync Library
                </button>
            </form>
            <button type="button" onclick="openUpload()" class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple w-full sm:w-auto">
                ⬆️ Upload Files
            </button>
        </div>
    </div>

    @if ($errors->any())
        <div class="mb-6 rounded-lg border border-red-500/40 bg-red-500/15 p-4 text-sm text-red-200">
            <ul class="list-disc pl-5 space-y-1">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    {{-- Filters --}}
    <form method="GET" action="{{ route('admin.media.index') }}" class="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div class="lg:col-span-2">
            <input type="text" name="search" value="{{ $search }}" placeholder="Search by file name, title, alt text…"
                   class="w-full rounded-lg border border-white/10 bg-night-800 px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:border-accent focus:outline-none">
        </div>
        <select name="type" class="w-full rounded-lg border border-white/10 bg-night-800 px-4 py-2.5 text-slate-200 focus:border-accent focus:outline-none">
            <option value="">All types</option>
            <option value="image" @selected($type === 'image')>Images</option>
            <option value="video" @selected($type === 'video')>Videos</option>
            <option value="audio" @selected($type === 'audio')>Audio</option>
            <option value="document" @selected($type === 'document')>Documents</option>
        </select>
        <select name="sort" class="w-full rounded-lg border border-white/10 bg-night-800 px-4 py-2.5 text-slate-200 focus:border-accent focus:outline-none">
            <option value="newest" @selected($sort === 'newest')>Newest first</option>
            <option value="oldest" @selected($sort === 'oldest')>Oldest first</option>
            <option value="name" @selected($sort === 'name')>File name</option>
            <option value="largest" @selected($sort === 'largest')>Largest first</option>
        </select>
        <input type="hidden" name="folder" value="{{ $folder }}">
        <div class="flex gap-2">
            <button type="submit" class="flex-1 rounded-lg bg-white/10 px-4 py-2.5 font-semibold text-slate-200 transition hover:bg-white/20">Apply</button>
            <a href="{{ route('admin.media.index') }}" class="rounded-lg bg-white/5 px-4 py-2.5 text-slate-400 transition hover:bg-white/10 hover:text-white">Reset</a>
        </div>
    </form>

    @if ($folders->isNotEmpty())
        <div class="mb-6 flex flex-wrap items-center gap-2">
            <span class="text-sm text-slate-500">Folders:</span>
            <a href="{{ route('admin.media.index', array_filter(['search' => $search, 'type' => $type, 'sort' => $sort])) }}"
               class="rounded-full px-3 py-1 text-sm transition {{ ! $folder ? 'bg-accent text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10' }}">All</a>
            @foreach ($folders as $f)
                <a href="{{ route('admin.media.index', array_filter(['search' => $search, 'type' => $type, 'sort' => $sort, 'folder' => $f])) }}"
                   class="rounded-full px-3 py-1 text-sm transition {{ $folder === $f ? 'bg-accent text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10' }}">{{ $f }}</a>
            @endforeach
        </div>
    @endif

    {{-- Bulk action bar --}}
    <form method="POST" action="{{ route('admin.media.bulk-destroy') }}" id="bulkForm" class="mb-4 hidden" onsubmit="return confirm('Delete the selected files? This cannot be undone.')">
        @csrf
        @method('DELETE')
        <div class="flex items-center justify-between gap-4 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3">
            <span class="text-sm font-semibold text-white"><span id="selectedCount">0</span> file(s) selected</span>
            <div class="flex items-center gap-3">
                <button type="button" onclick="clearSelection()" class="text-sm text-slate-300 hover:text-white">Clear</button>
                <button type="submit" class="rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Delete Selected</button>
            </div>
        </div>
    </form>

    {{-- Grid --}}
    @forelse ($media as $item)
        @if ($loop->first)
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        @endif

        <div class="group relative overflow-hidden rounded-xl border border-white/10 bg-night-800/60 transition hover:border-accent/60">
            <div class="relative aspect-square overflow-hidden bg-night-900">
                @if ($item->isImage())
                    <img src="{{ $item->url }}" alt="{{ $item->alt_text ?? $item->file_name }}" loading="lazy"
                         class="h-full w-full object-cover transition duration-300 group-hover:scale-105">
                @elseif ($item->isVideo())
                    <video src="{{ $item->url }}" class="h-full w-full object-cover" muted></video>
                    <span class="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">VIDEO</span>
                @elseif ($item->isAudio())
                    <div class="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500">
                        <span class="text-3xl">🎵</span>
                        <span class="text-xs uppercase tracking-wider">Audio</span>
                    </div>
                @else
                    <div class="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500">
                        <span class="text-3xl">📄</span>
                        <span class="px-2 text-xs uppercase tracking-wider">{{ $item->extension() }}</span>
                    </div>
                @endif

                <input type="checkbox" name="ids[]" value="{{ $item->id }}" form="bulkForm"
                       onchange="toggleSelect(this)" class="absolute left-2 top-2 h-4 w-4 rounded border-white/30 bg-black/50 accent-accent opacity-0 transition group-hover:opacity-100 checked:opacity-100">
            </div>

            <div class="p-3">
                <p class="truncate text-sm font-medium text-white" title="{{ $item->file_name }}">{{ $item->file_name }}</p>
                <p class="mt-0.5 text-xs text-slate-500">{{ $item->humanSize() }} &middot; {{ $item->created_at?->format('M j, Y') }}</p>

                <div class="mt-2 flex flex-wrap gap-1.5">
                    <button type="button" onclick='copyUrl(@json($item->url))' class="rounded bg-white/5 px-2 py-1 text-xs font-semibold text-slate-300 transition hover:bg-accent hover:text-white">Copy URL</button>
                    <button type="button" onclick='editMedia(@json([
                        "id" => $item->id,
                        "title" => $item->title,
                        "alt_text" => $item->alt_text,
                        "url" => $item->url,
                        "is_image" => $item->isImage(),
                    ]))' class="rounded bg-white/5 px-2 py-1 text-xs font-semibold text-slate-300 transition hover:bg-white/20 hover:text-white">Edit</button>
                    <button type="button" data-delete-url="{{ route('admin.media.destroy', $item) }}" class="rounded bg-white/5 px-2 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500 hover:text-white">Delete</button>
                </div>
            </div>
        </div>

        @if ($loop->last)
            </div>
        @endif
    @empty
        <div class="rounded-xl border border-dashed border-white/15 bg-night-800/30 px-6 py-16 text-center">
            <p class="text-4xl">🗂️</p>
            <p class="mt-4 text-lg font-semibold text-white">No files found</p>
            <p class="mt-1 text-sm text-slate-400">Upload your first file to start building your library.</p>
            <button type="button" onclick="openUpload()" class="mt-6 inline-flex items-center rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple">⬆️ Upload Files</button>
        </div>
    @endforelse

    <div class="mt-8">
        {{ $media->links() }}
    </div>
</div>

{{-- Upload modal --}}
<div id="uploadModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4">
    <div class="w-full max-w-lg rounded-xl border border-white/10 bg-night-800 p-6">
        <div class="flex items-start justify-between">
            <h2 class="text-xl font-bold text-white">Upload Files</h2>
            <button type="button" onclick="closeUpload()" class="text-slate-400 hover:text-white" aria-label="Close">&times;</button>
        </div>

        <form method="POST" action="{{ route('admin.media.store') }}" enctype="multipart/form-data" class="mt-5 space-y-4">
            @csrf

            <div id="dropzone" onclick="document.getElementById('files').click()"
                 class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/15 bg-night-900/60 px-6 py-10 text-center transition hover:border-accent/60">
                <span class="text-3xl">📤</span>
                <p class="mt-3 text-sm font-semibold text-white">Drop files here or click to browse</p>
                <p class="mt-1 text-xs text-slate-500">Images, video, audio, PDF, Office or ZIP &middot; up to 10 MB each &middot; 20 files max</p>
                <ul id="fileList" class="mt-3 w-full space-y-1 text-left text-xs text-slate-400"></ul>
            </div>

            <input type="file" id="files" name="files[]" multiple class="hidden"
                   accept="image/*,video/mp4,video/webm,audio/*,application/pdf,.doc,.docx,.zip"
                   onchange="listFiles(this)">

            <div>
                <label for="folder" class="mb-1.5 block text-sm font-semibold text-slate-300">Folder</label>
                <input type="text" id="folder" name="folder" value="library" list="folderList"
                       class="w-full rounded-lg border border-white/10 bg-night-900 px-4 py-2.5 text-slate-200 focus:border-accent focus:outline-none">
                <datalist id="folderList">
                    <option value="library"></option>
                    <option value="posts"></option>
                    <option value="avatars"></option>
                    <option value="banners"></option>
                </datalist>
            </div>

            <div class="flex justify-end gap-3 pt-2">
                <button type="button" onclick="closeUpload()" class="rounded-lg bg-white/5 px-5 py-2.5 font-semibold text-slate-300 transition hover:bg-white/10">Cancel</button>
                <button type="submit" class="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-accent-purple">Upload</button>
            </div>
        </form>
    </div>
</div>

{{-- Edit modal --}}
<div id="editModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4">
    <div class="w-full max-w-lg rounded-xl border border-white/10 bg-night-800 p-6">
        <div class="flex items-start justify-between">
            <h2 class="text-xl font-bold text-white">Edit File Details</h2>
            <button type="button" onclick="closeEdit()" class="text-slate-400 hover:text-white" aria-label="Close">&times;</button>
        </div>

        <form id="editForm" method="POST" class="mt-5 space-y-4">
            @csrf
            @method('PATCH')
            <div id="editPreview" class="hidden overflow-hidden rounded-lg border border-white/10 bg-night-900"></div>
            <div>
                <label for="editTitle" class="mb-1.5 block text-sm font-semibold text-slate-300">Title</label>
                <input type="text" id="editTitle" name="title" maxlength="255"
                       class="w-full rounded-lg border border-white/10 bg-night-900 px-4 py-2.5 text-slate-200 focus:border-accent focus:outline-none">
            </div>
            <div>
                <label for="editAlt" class="mb-1.5 block text-sm font-semibold text-slate-300">Alt text</label>
                <input type="text" id="editAlt" name="alt_text" maxlength="255" placeholder="Describe the image for accessibility"
                       class="w-full rounded-lg border border-white/10 bg-night-900 px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:border-accent focus:outline-none">
            </div>
            <div class="flex justify-end gap-3 pt-2">
                <button type="button" onclick="closeEdit()" class="rounded-lg bg-white/5 px-5 py-2.5 font-semibold text-slate-300 transition hover:bg-white/10">Cancel</button>
                <button type="submit" class="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-accent-purple">Save Changes</button>
            </div>
        </form>
    </div>
</div>

{{-- Delete form (single) --}}
<form method="POST" action="{{ route('admin.media.index') }}" id="deleteForm" class="hidden">@csrf @method('DELETE')</form>
@endsection

@push('scripts')
<script>
    function openUpload() {
        const modal = document.getElementById('uploadModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeUpload() {
        const modal = document.getElementById('uploadModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    function listFiles(input) {
        const list = document.getElementById('fileList');
        list.innerHTML = '';
        Array.from(input.files).forEach(function (file) {
            const li = document.createElement('li');
            li.className = 'truncate';
            li.textContent = file.name + ' (' + (file.size / 1048576).toFixed(2) + ' MB)';
            list.appendChild(li);
        });
    }

    function copyUrl(url) {
        const done = function () {
            const btn = event.target;
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(function () { btn.textContent = original; }, 1500);
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(done);
            return;
        }

        const field = document.createElement('textarea');
        field.value = url;
        document.body.appendChild(field);
        field.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* noop */ }
        document.body.removeChild(field);
    }

    function toggleSelect(checkbox) {
        const form = document.getElementById('bulkForm');
        const count = form.querySelectorAll('input[name="ids[]"]:checked').length;
        document.getElementById('selectedCount').textContent = count;
        form.classList.toggle('hidden', count === 0);
    }

    function clearSelection() {
        document.querySelectorAll('input[name="ids[]"]').forEach(function (cb) { cb.checked = false; });
        document.getElementById('bulkForm').classList.add('hidden');
        document.getElementById('selectedCount').textContent = '0';
    }

    function editMedia(item) {
        const form = document.getElementById('editForm');
        form.action = '{{ route('admin.media.index') }}/' + item.id;
        document.getElementById('editTitle').value = item.title || '';
        document.getElementById('editAlt').value = item.alt_text || '';

        const preview = document.getElementById('editPreview');
        if (item.is_image) {
            preview.classList.remove('hidden');
            preview.innerHTML = '<img src="' + item.url + '" alt="" class="max-h-56 w-full object-contain">';
        } else {
            preview.classList.add('hidden');
            preview.innerHTML = '';
        }

        const modal = document.getElementById('editModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeEdit() {
        const modal = document.getElementById('editModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    // Drag & drop support
    document.addEventListener('DOMContentLoaded', function () {
        const dropzone = document.getElementById('dropzone');
        const input = document.getElementById('files');

        ['dragenter', 'dragover'].forEach(function (evt) {
            dropzone.addEventListener(evt, function (e) {
                e.preventDefault();
                dropzone.classList.add('border-accent');
            });
        });

        ['dragleave', 'drop'].forEach(function (evt) {
            dropzone.addEventListener(evt, function (e) {
                e.preventDefault();
                dropzone.classList.remove('border-accent');
            });
        });

        dropzone.addEventListener('drop', function (e) {
            if (e.dataTransfer && e.dataTransfer.files.length) {
                input.files = e.dataTransfer.files;
                listFiles(input);
            }
        });

        // Submit a single delete straight from a grid item
        document.querySelectorAll('[data-delete-url]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (!confirm('Delete this file? This cannot be undone.')) {
                    return;
                }
                var form = document.getElementById('deleteForm');
                form.action = btn.dataset.deleteUrl;
                form.submit();
            });
        });
    });
</script>
@endpush
