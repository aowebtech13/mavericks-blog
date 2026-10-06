<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - Blog Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html {
            font-size: 16px;
        }
        body {
            font-family: 'Darker Grotesque', sans-serif;
        }
::selection {
            background: rgba(34, 126, 255, 0.35);
            color: #fff;
        }
        /* Trix editor — dark theme tuned for the admin panel */
        trix-toolbar {
            display: block;
            background: #0d1017;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem 0.5rem 0 0;
            padding: 0.5rem;
            margin-bottom: -1px;
        }
        trix-toolbar .trix-button-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5rem;
            overflow-x: auto;
        }
        trix-toolbar .trix-button-group {
            display: flex;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 0.375rem;
            margin-bottom: 0;
            background: rgba(255, 255, 255, 0.04);
        }
        trix-toolbar .trix-button-group:not(:first-child) {
            margin-left: 0;
        }
        trix-toolbar .trix-button {
            position: relative;
            color: #e2e8f0;
            font-size: 0.75em;
            font-weight: 600;
            white-space: nowrap;
            padding: 0 0.5em;
            margin: 0;
            outline: none;
            border: none;
            border-radius: 0;
            background: transparent;
        }
        trix-toolbar .trix-button:not(:first-child) {
            border-left: 1px solid rgba(255, 255, 255, 0.12);
        }
        /* Trix ships black SVG icons — invert them to bright white for the dark toolbar */
        trix-toolbar .trix-button--icon::before {
            filter: brightness(0) invert(1);
            opacity: 0.85;
        }
        trix-toolbar .trix-button--icon.trix-active::before {
            opacity: 1;
        }
        trix-toolbar .trix-button:hover,
        trix-toolbar .trix-button.trix-active {
            background-color: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }
        trix-toolbar .trix-button.trix-active {
            background-color: #007BFF;
        }
        trix-toolbar .trix-button:disabled {
            color: #475569;
            background: none;
        }
        trix-toolbar .trix-button:disabled::before,
        trix-toolbar .trix-button--icon:disabled::before {
            opacity: 0.25;
        }
        trix-toolbar__separator {
            border-color: rgba(255, 255, 255, 0.12);
        }
        trix-toolbar input[type="url"],
        trix-toolbar input[type="text"] {
            background: #0d1017;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 0.375rem;
            color: #e2e8f0;
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
        }
        trix-toolbar input[type="url"]:focus,
        trix-toolbar input[type="text"]:focus {
            outline: none;
            border-color: #007BFF;
            box-shadow: 0 0 0 1px #007BFF;
        }
        trix-toolbar .trix-dialog {
            background: #11141d;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.375rem;
            padding: 0.5rem;
            margin-top: 0.5rem;
        }
        trix-toolbar .trix-button--dialog {
            background: rgba(255, 255, 255, 0.06);
            border-radius: 0.25rem;
            padding: 0.25rem 0.75rem;
        }

        trix-editor {
            min-height: 24rem;
            background: #0d1017;
            color: #e2e8f0;
            padding: 1rem;
            font-size: 1rem;
            line-height: 1.65;
        }
        trix-editor.rich-text {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0 0 0.5rem 0.5rem;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        trix-editor:not(.rich-text) {
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        trix-editor:focus {
            outline: none;
            box-shadow: inset 0 0 0 1px #007BFF;
        }
        trix-editor h1,
        trix-editor h2,
        trix-editor h3 {
            color: #ffffff;
            line-height: 1.3;
            margin: 1.25rem 0 0.5rem;
        }
        trix-editor p,
        trix-editor li {
            color: #e2e8f0;
        }
        trix-editor a {
            color: #007BFF;
            text-decoration: underline;
        }
        trix-editor blockquote {
            border-left: 3px solid #007BFF;
            padding-left: 0.9rem;
            margin-left: 0;
            color: #94a3b8;
        }
        trix-editor pre {
            background: #11141d;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 0.5rem;
            padding: 0.85rem 1rem;
            color: #e2e8f0;
            white-space: pre-wrap;
            overflow-x: auto;
        }
        trix-editor ul,
        trix-editor ol {
            padding-left: 1.4rem;
        }
        trix-editor ul { list-style: disc; }
        trix-editor ol { list-style: decimal; }
        trix-editor img {
            max-width: 100%;
            border-radius: 0.5rem;
            display: block;
        }
        trix-editor figure {
            margin: 1rem 0;
        }
        trix-editor figcaption {
            font-size: 0.8125rem;
            color: #64748b;
            text-align: center;
            margin-top: 0.4rem;
        }
        trix-editor .attachment__caption-editor,
        trix-editor .attachment__caption {
            color: #94a3b8;
            font-size: 0.8125rem;
        }
        trix-editor .attachment__preview__filename {
            color: #94a3b8;
        }

        /* Hide Trix's own progress bar caption field chrome if we render our own */
        .trix-content .attachment__name {
            display: none;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        grotesque: ['Darker Grotesque', 'sans-serif'],
                    },
                    colors: {
                        night: {
                            950: '#0d1017',
                            900: '#11141d',
                            800: '#191d2a',
                            700: '#252a32',
                            600: '#323a44',
                            500: '#3d4753',
                        },
                        accent: {
                            DEFAULT: '#007BFF',
                            purple: '#7E27E2',
                            yellow: '#fff049',
                            green: '#09f647',
                        },
                    },
                },
            },
        };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/trix@2/dist/trix.umd.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/trix@2/dist/trix.css">
    <script>
        window.trixUploadUrl = @json(route('admin.media.upload'));
        window.trixCsrfToken = @json(csrf_token());
    </script>
    <script>
        // Track which Trix editor triggered the media picker so we can insert
        // the selected image back into the correct editor.
        var trixPickerEditor = null;
        var trixPickerTargetFigure = null;

        // Intercept the attachment button in the capture phase so the
        // media picker opens BEFORE Trix opens its native file dialog.
        // Trix triggers the file input on mousedown, so we must intercept
        // mousedown rather than click.
        document.addEventListener('mousedown', function (event) {
            var btn = event.target.closest('.trix-button--icon-attach');
            if (!btn) return;

            // Find the trix-editor this button belongs to.
            var toolbar = btn.closest('trix-toolbar');
            var editorId = toolbar ? toolbar.getAttribute('data-trix-editor') : null;
            var editorEl = editorId ? document.getElementById(editorId) : document.querySelector('trix-editor');
            if (!editorEl) return;

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            trixPickerEditor = editorEl;
            openMediaPicker(function (item) {
                if (item && item.url && trixPickerEditor) {
                    var imgTag = '<img src="' + item.url + '" alt="' + (item.alt_text || item.file_name) + '"';
                    if (item.selected_width) imgTag += ' width="' + item.selected_width + '"';
                    if (item.selected_height) imgTag += ' height="' + item.selected_height + '"';
                    imgTag += '>';
                    trixPickerEditor.editor.insertHTML(imgTag);
                }
                trixPickerEditor = null;
            });
        }, true);

        // Allow clicking an existing image inside Trix to adjust or replace it.
        document.addEventListener('click', function (event) {
            var figure = event.target.closest('figure.attachment');
            if (!figure) return;

            var editorEl = figure.closest('trix-editor');
            if (!editorEl) return;

            event.preventDefault();
            event.stopPropagation();

            // Pre-fill width/height with the image's current dimensions.
            var img = figure.querySelector('img');
            if (img) {
                document.getElementById('mpWidth').value = img.getAttribute('width') || '';
                document.getElementById('mpHeight').value = img.getAttribute('height') || '';
            } else {
                document.getElementById('mpWidth').value = '';
                document.getElementById('mpHeight').value = '';
            }

            trixPickerEditor = editorEl;
            trixPickerTargetFigure = figure;
            openMediaPicker(function (item) {
                if (item && item.url && trixPickerEditor) {
                    var targetImg = trixPickerTargetFigure ? trixPickerTargetFigure.querySelector('img') : null;
                    if (targetImg) {
                        // Update the existing image in-place.
                        targetImg.src = item.url;
                        targetImg.alt = item.alt_text || item.file_name;
                        if (item.selected_width) targetImg.setAttribute('width', item.selected_width);
                        else targetImg.removeAttribute('width');
                        if (item.selected_height) targetImg.setAttribute('height', item.selected_height);
                        else targetImg.removeAttribute('height');
                    } else {
                        // Fallback: insert a new image.
                        var imgTag = '<img src="' + item.url + '" alt="' + (item.alt_text || item.file_name) + '"';
                        if (item.selected_width) imgTag += ' width="' + item.selected_width + '"';
                        if (item.selected_height) imgTag += ' height="' + item.selected_height + '"';
                        imgTag += '>';
                        trixPickerEditor.editor.insertHTML(imgTag);
                    }
                }
                trixPickerEditor = null;
                trixPickerTargetFigure = null;
            });
        });

        // Trix 2 wires a toolbar to an editor through the native `toolbar`
        // attribute and builds its own toolbar (correct buttons, attributes and
        // link dialog) when none is supplied. The dark-theme CSS above styles
        // that toolbar for the admin panel. Uploads are handled through the
        // `trix-attachment-add` event, which is the Trix 2 replacement for the
        // removed `uploadHandler` option.
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('trix-editor').forEach(function (editorElement) {
                editorElement.addEventListener('trix-attachment-add', function (event) {
                    var attachment = event.attachment;
                    // Attachments restored from saved HTML have no file to upload.
                    if (!attachment.file) {
                        return;
                    }

                    var data = new FormData();
                    // The media endpoint validates an array under `files`.
                    data.append('files[]', attachment.file);
                    data.append('folder', 'posts');

                    fetch(window.trixUploadUrl, {
                        method: 'POST',
                        body: data,
                        headers: { 'X-CSRF-TOKEN': window.trixCsrfToken },
                        credentials: 'same-origin'
                    })
                        .then(function (response) {
                            if (!response.ok) {
                                return response.json().then(function (json) {
                                    throw new Error(json.message || 'Upload failed');
                                });
                            }
                            return response.json();
                        })
                        .then(function (json) {
                            attachment.setUploadProgress(100);
                            attachment.setAttributes({
                                url: json.url,
                                href: json.url
                            });
                        })
                        .catch(function (error) {
                            alert(error.message || 'Upload failed');
                            attachment.remove();
                        });
                });
            });
        });
    </script>
</head>
<body class="min-h-screen bg-night-900 font-grotesque text-slate-200">
    {{-- Media Picker Modal --}}
    <div id="mediaPickerModal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4">
        <div class="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-xl border border-white/10 bg-night-800">
            <div class="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h2 class="text-xl font-bold text-white">Select Image</h2>
                <button type="button" onclick="closeMediaPicker()" class="text-slate-400 hover:text-white" aria-label="Close">&times;</button>
            </div>
            <div class="flex flex-1 overflow-hidden">
                {{-- Sidebar / filters --}}
                <div class="w-64 shrink-0 border-r border-white/10 p-4 space-y-4">
                    <div>
                        <label class="mb-1.5 block text-sm font-semibold text-slate-300">Search</label>
                        <input type="text" id="mpSearch" placeholder="Search files…"
                               class="w-full rounded-lg border border-white/10 bg-night-900 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-accent focus:outline-none">
                    </div>
                    <div>
                        <label class="mb-1.5 block text-sm font-semibold text-slate-300">Type</label>
                        <select id="mpType" class="w-full rounded-lg border border-white/10 bg-night-900 px-3 py-2 text-sm text-slate-200 focus:border-accent focus:outline-none">
                            <option value="">All types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                            <option value="audio">Audio</option>
                            <option value="document">Documents</option>
                        </select>
                    </div>
                    <div>
                        <label class="mb-1.5 block text-sm font-semibold text-slate-300">Sort</label>
                        <select id="mpSort" class="w-full rounded-lg border border-white/10 bg-night-900 px-3 py-2 text-sm text-slate-200 focus:border-accent focus:outline-none">
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                            <option value="name">File name</option>
                            <option value="largest">Largest first</option>
                        </select>
                    </div>
                    <div class="border-t border-white/10 pt-4">
                        <label class="mb-1.5 block text-sm font-semibold text-slate-300">Width (px)</label>
                        <input type="number" id="mpWidth" value="" placeholder="Auto"
                               class="w-full rounded-lg border border-white/10 bg-night-900 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-accent focus:outline-none">
                    </div>
                    <div>
                        <label class="mb-1.5 block text-sm font-semibold text-slate-300">Height (px)</label>
                        <input type="number" id="mpHeight" value="" placeholder="Auto"
                               class="w-full rounded-lg border border-white/10 bg-night-900 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-accent focus:outline-none">
                    </div>
                    <button type="button" onclick="openMediaPickerUpload()" class="w-full rounded-lg bg-accent px-4 py-2.5 font-semibold text-white transition hover:bg-accent-purple">
                        ⬆️ Upload New
                    </button>
                </div>
                {{-- Grid --}}
                <div class="flex-1 overflow-y-auto p-4">
                    <div id="mpGrid" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        <div class="col-span-full py-16 text-center text-slate-500">Loading…</div>
                    </div>
                    <div id="mpPagination" class="mt-4"></div>
                </div>
            </div>
        </div>
    </div>

    {{-- Media Picker Upload Modal --}}
    <div id="mediaPickerUploadModal" class="fixed inset-0 z-[60] hidden items-center justify-center bg-black/70 p-4">
        <div class="w-full max-w-lg rounded-xl border border-white/10 bg-night-800 p-6">
            <div class="flex items-start justify-between">
                <h2 class="text-xl font-bold text-white">Upload Files</h2>
                <button type="button" onclick="closeMediaPickerUpload()" class="text-slate-400 hover:text-white" aria-label="Close">&times;</button>
            </div>
            <form id="mpUploadForm" method="POST" action="{{ route('admin.media.upload') }}" enctype="multipart/form-data" class="mt-5 space-y-4">
                @csrf
                <div id="mpDropzone" onclick="document.getElementById('mpFiles').click()"
                     class="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/15 bg-night-900/60 px-6 py-10 text-center transition hover:border-accent/60">
                    <span class="text-3xl">📤</span>
                    <p class="mt-3 text-sm font-semibold text-white">Drop files here or click to browse</p>
                    <p class="mt-1 text-xs text-slate-500">Images, video, audio, PDF, Office or ZIP &middot; up to 10 MB each &middot; 20 files max</p>
                    <ul id="mpFileList" class="mt-3 w-full space-y-1 text-left text-xs text-slate-400"></ul>
                </div>
                <input type="file" id="mpFiles" name="files[]" multiple class="hidden"
                       accept="image/*,video/mp4,video/webm,audio/*,application/pdf,.doc,.docx,.zip"
                       onchange="listMpFiles(this)">
                <div>
                    <label for="mpFolder" class="mb-1.5 block text-sm font-semibold text-slate-300">Folder</label>
                    <input type="text" id="mpFolder" name="folder" value="library" list="mpFolderList"
                           class="w-full rounded-lg border border-white/10 bg-night-900 px-4 py-2.5 text-slate-200 focus:border-accent focus:outline-none">
                    <datalist id="mpFolderList">
                        <option value="library"></option>
                        <option value="posts"></option>
                        <option value="avatars"></option>
                        <option value="banners"></option>
                    </datalist>
                </div>
                <div id="mpUploadProgress" class="hidden">
                    <div class="flex items-center justify-between text-sm text-slate-300">
                        <span>Uploading…</span>
                        <span id="mpUploadPercent">0%</span>
                    </div>
                    <div class="mt-2 h-2 rounded-full bg-night-900 overflow-hidden">
                        <div id="mpUploadBar" class="h-full rounded-full bg-accent transition-all duration-200" style="width:0%"></div>
                    </div>
                </div>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="closeMediaPickerUpload()" class="rounded-lg bg-white/5 px-5 py-2.5 font-semibold text-slate-300 transition hover:bg-white/10">Cancel</button>
                    <button type="submit" id="mpUploadBtn" class="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white transition hover:bg-accent-purple">Upload</button>
                </div>
            </form>
        </div>
    </div>

    <script>
    // ---- Media Picker ----
    var mediaPickerCallback = null;
        var mediaPickerCurrentPage = 1;

        function openMediaPicker(callback) {
            mediaPickerCallback = callback;
            mediaPickerCurrentPage = 1;
            var modal = document.getElementById('mediaPickerModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            loadMediaPickerItems();
        }

        function closeMediaPicker() {
            var modal = document.getElementById('mediaPickerModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            mediaPickerCallback = null;
        }

        function openMediaPickerUpload() {
            var modal = document.getElementById('mediaPickerUploadModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeMediaPickerUpload() {
            var modal = document.getElementById('mediaPickerUploadModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function listMpFiles(input) {
            var list = document.getElementById('mpFileList');
            list.innerHTML = '';
            Array.from(input.files).forEach(function (file) {
                var li = document.createElement('li');
                li.className = 'truncate';
                li.textContent = file.name + ' (' + (file.size / 1048576).toFixed(2) + ' MB)';
                list.appendChild(li);
            });
        }

        function loadMediaPickerItems(page) {
            page = page || 1;
            mediaPickerCurrentPage = page;
            var grid = document.getElementById('mpGrid');
            var pagination = document.getElementById('mpPagination');
            grid.innerHTML = '<div class="col-span-full py-16 text-center text-slate-500">Loading…</div>';
            pagination.innerHTML = '';

            var params = new URLSearchParams({ page: page, per_page: 24 });
            var search = document.getElementById('mpSearch').value;
            var type = document.getElementById('mpType').value;
            var sort = document.getElementById('mpSort').value;
            if (search) params.set('search', search);
            if (type) params.set('type', type);
            if (sort) params.set('sort', sort);

            fetch('{{ route('admin.media.list') }}?' + params.toString(), {
                headers: { 'Accept': 'application/json' }
            })
                .then(function (r) { return r.json(); })
                .then(function (json) {
                    var items = json.data;
                    if (!items.length) {
                        grid.innerHTML = '<div class="col-span-full py-16 text-center text-slate-500">No files found</div>';
                        return;
                    }
                    grid.innerHTML = '';
                    items.forEach(function (item) {
                        var el = document.createElement('div');
                        el.className = 'group relative overflow-hidden rounded-xl border border-white/10 bg-night-800/60 transition hover:border-accent/60 cursor-pointer';
                        el.onclick = function () { selectMediaPickerItem(item); };

                        var preview = '';
                        if (item.is_image) {
                            preview = '<img src="' + item.url + '" alt="" loading="lazy" class="h-full w-full object-cover transition duration-300 group-hover:scale-105">';
                        } else if (item.is_video) {
                            preview = '<video src="' + item.url + '" class="h-full w-full object-cover" muted></video>' +
                                '<span class="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">VIDEO</span>';
                        } else if (item.is_audio) {
                            preview = '<div class="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500"><span class="text-3xl">🎵</span><span class="text-xs uppercase tracking-wider">Audio</span></div>';
                        } else {
                            preview = '<div class="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500"><span class="text-3xl">📄</span><span class="px-2 text-xs uppercase tracking-wider">' + item.extension + '</span></div>';
                        }

                        el.innerHTML = '<div class="relative aspect-square overflow-hidden bg-night-900">' + preview + '</div>' +
                            '<div class="p-3">' +
                            '<p class="truncate text-sm font-medium text-white" title="' + item.file_name + '">' + item.file_name + '</p>' +
                            '<p class="mt-0.5 text-xs text-slate-500">' + item.human_size + ' &middot; ' + (item.created_at ? new Date(item.created_at).toLocaleDateString() : '') + '</p>' +
                            '</div>';
                        grid.appendChild(el);
                    });

                    // Pagination
                    var meta = json.meta;
                    if (meta.last_page > 1) {
                        var html = '<div class="flex items-center justify-center gap-2">';
                        if (meta.current_page > 1) {
                            html += '<button type="button" onclick="loadMediaPickerItems(' + (meta.current_page - 1) + ')" class="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10">← Prev</button>';
                        }
                        html += '<span class="text-sm text-slate-400">Page ' + meta.current_page + ' of ' + meta.last_page + '</span>';
                        if (meta.current_page < meta.last_page) {
                            html += '<button type="button" onclick="loadMediaPickerItems(' + (meta.current_page + 1) + ')" class="rounded-lg bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10">Next →</button>';
                        }
                        html += '</div>';
                        pagination.innerHTML = html;
                    }
                })
                .catch(function () {
                    grid.innerHTML = '<div class="col-span-full py-16 text-center text-red-400">Failed to load media.</div>';
                });
        }

        function selectMediaPickerItem(item) {
            if (!mediaPickerCallback) return;

            var width = document.getElementById('mpWidth').value;
            var height = document.getElementById('mpHeight').value;

            // Attach sizing info to the item so callers can use it.
            item.selected_width = width ? parseInt(width, 10) : null;
            item.selected_height = height ? parseInt(height, 10) : null;

            mediaPickerCallback(item);
            closeMediaPicker();
        }

        // Auto-refresh on filter change
        document.addEventListener('DOMContentLoaded', function () {
            ['mpSearch', 'mpType', 'mpSort'].forEach(function (id) {
                var el = document.getElementById(id);
                if (el) {
                    el.addEventListener('change', function () { loadMediaPickerItems(1); });
                    if (id === 'mpSearch') {
                        el.addEventListener('keyup', function (e) { if (e.key === 'Enter') loadMediaPickerItems(1); });
                    }
                }
            });

            // Upload form submit via AJAX with progress
            var uploadForm = document.getElementById('mpUploadForm');
            if (uploadForm) {
                uploadForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    var formData = new FormData(uploadForm);
                    var xhr = new XMLHttpRequest();
                    var progressEl = document.getElementById('mpUploadProgress');
                    var progressBar = document.getElementById('mpUploadBar');
                    var progressPercent = document.getElementById('mpUploadPercent');
                    var uploadBtn = document.getElementById('mpUploadBtn');

                    progressEl.classList.remove('hidden');
                    uploadBtn.disabled = true;

                    xhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            var pct = Math.round((e.loaded / e.total) * 100);
                            progressBar.style.width = pct + '%';
                            progressPercent.textContent = pct + '%';
                        }
                    });

                    xhr.onload = function () {
                        progressEl.classList.add('hidden');
                        uploadBtn.disabled = false;
                        progressBar.style.width = '0%';
                        progressPercent.textContent = '0%';

                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                JSON.parse(xhr.responseText);
                            } catch (err) {
                                // Close modal and refresh even if JSON parsing fails.
                                closeMediaPickerUpload();
                                uploadForm.reset();
                                document.getElementById('mpFileList').innerHTML = '';
                                loadMediaPickerItems(1);
                                return;
                            }
                            closeMediaPickerUpload();
                            uploadForm.reset();
                            document.getElementById('mpFileList').innerHTML = '';
                            loadMediaPickerItems(1);
                        } else {
                            var msg = 'Upload failed (status ' + xhr.status + ')';
                            try {
                                var errJson = JSON.parse(xhr.responseText);
                                msg = errJson.message || msg;
                            } catch (err) { /* ignore */ }
                            alert(msg);
                        }
                    };

                    xhr.onerror = function () {
                        progressEl.classList.add('hidden');
                        uploadBtn.disabled = false;
                        progressBar.style.width = '0%';
                        progressPercent.textContent = '0%';
                        alert('Upload failed. Please try again.');
                    };

                    xhr.open('POST', uploadForm.action);
                    xhr.setRequestHeader('X-CSRF-TOKEN', '{{ csrf_token() }}');
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.send(formData);
                });
            }
        });
    </script>
    <div class="flex min-h-screen flex-col lg:flex-row">
        <aside class="w-full shrink-0 bg-night-950 lg:w-64 lg:min-h-screen lg:sticky lg:top-0">
            <div class="border-b border-white/10 px-6 py-6">
                <h1 class="text-xl font-bold tracking-wide text-white">mavericksAi</h1>
                <p class="mt-0.5 text-sm text-slate-500">Admin Area</p>
            </div>

            <nav class="p-4">
                <div class="grid grid-cols-2 gap-1 lg:grid-cols-1">
                    <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.dashboard') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">📊</span> Dashboard
                    </a>
                    <a href="{{ route('admin.posts.index') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.posts*') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">📝</span> Posts
                    </a>
                    <a href="{{ route('admin.categories.index') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.categories*') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">📁</span> Categories
                    </a>
                    <a href="{{ route('admin.media.index') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.media*') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">🗂️</span> Media
                    </a>
                    <a href="{{ route('admin.tags.index') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.tags*') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">🏷️</span> Tags
                    </a>
                    <a href="{{ route('admin.ai-writer.index') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.ai-writer*') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">🤖</span> AI Writer
                    </a>
                    <a href="{{ route('admin.password.change') }}" class="flex items-center gap-2.5 rounded-md px-4 py-2.5 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white {{ request()->routeIs('admin.password.change') ? 'bg-white/5 text-white' : '' }}">
                        <span class="opacity-70">🔐</span> Password
                    </a>
                </div>
            </nav>

            <div class="border-t border-white/10 px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                        {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                    </div>
                    <div class="min-w-0">
                        <p class="truncate text-sm font-semibold text-white">{{ auth()->user()->name }}</p>
                        <form action="{{ route('admin.logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="text-sm text-slate-500 transition hover:text-red-400">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </aside>

        <main class="min-w-0 flex-1">
            <div class="p-4 md:p-6 lg:p-8">
                @if ($errors->any())
                    <div id="error-toast" class="mb-6 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/15 p-4 text-sm text-red-200 shadow-lg">
                        <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <div class="flex-1">
                            <p class="font-semibold text-red-300">Please fix the following:</p>
                            <ul class="mt-1 list-inside list-disc">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                        <button type="button" onclick="document.getElementById('error-toast').classList.add('hidden')" class="shrink-0 text-red-400 hover:text-red-200" aria-label="Dismiss">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                @endif

                @if (session('success'))
                    <div id="success-toast" class="mb-6 flex items-start gap-3 rounded-lg border border-green-500/40 bg-green-500/15 p-4 text-sm text-green-200 shadow-lg">
                        <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.803a1 1 0 00-1.414-1.414L9 10.173l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <div class="flex-1 font-medium">{{ session('success') }}</div>
                        <button type="button" onclick="document.getElementById('success-toast').classList.add('hidden')" class="shrink-0 text-green-400 hover:text-green-200" aria-label="Dismiss">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                @endif

                @yield('content')
            </div>
        </main>
    </div>

    @stack('scripts')
</body>
</html>

