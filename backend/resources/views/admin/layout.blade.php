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
        .trix-toolbar .trix-button-group {
            border-color: rgba(255, 255, 255, 0.12);
        }
        .trix-toolbar .trix-button {
            border-color: rgba(255, 255, 255, 0.12);
            color: #cbd5e1;
        }
        .trix-toolbar .trix-button:hover,
        .trix-toolbar .trix-button.trix-active {
            background-color: rgba(255, 255, 255, 0.08);
            color: #ffffff;
        }
        .trix-toolbar .trix-button.trix-active {
            background-color: #007BFF;
        }
        .trix-toolbar .trix-button:disabled {
            color: #475569;
            background: none;
        }
        .trix-toolbar__separator {
            border-color: rgba(255, 255, 255, 0.12);
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
        // Builds the Trix toolbar markup for an editor.
        function buildTrixToolbar(toolbarId) {
            var toolbar = document.createElement('trix-toolbar');
            toolbar.id = toolbarId;
            toolbar.innerHTML = [
                '<div class="trix-button-group">',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-attach" title="Attach a file" data-trix-action="attachFile" tabindex="-1">Attach a file</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-link" title="Add a link" data-trix-action="link" tabindex="-1">Add a link</button>',
                '<input type="file" accept="image/*,video/*,application/pdf" data-trix-input="attachFile" hidden>',
                '<input type="url" placeholder="Enter URL..." data-trix-input="link" class="hidden">',
                '</div>',
                '<div class="trix-button-group">',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-bold" title="Bold" data-trix-format="bold" tabindex="-1">Bold</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-italic" title="Italic" data-trix-format="italic" tabindex="-1">Italic</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-code" title="Inline code" data-trix-format="code" tabindex="-1">Inline code</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-pre" title="Preformatted" data-trix-format="pre" tabindex="-1">Preformatted</button>',
                '</div>',
                '<div class="trix-button-group">',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" title="Heading 1" data-trix-format="h1" tabindex="-1">Heading 1</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-heading-2" title="Heading 2" data-trix-format="h2" tabindex="-1">Heading 2</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-heading-3" title="Heading 3" data-trix-format="h3" tabindex="-1">Heading 3</button>',
                '</div>',
                '<div class="trix-button-group">',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-strikethrough" title="Strikethrough" data-trix-format="strike" tabindex="-1">Strikethrough</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" title="Bulleted list" data-trix-format="bulletList" tabindex="-1">Bulleted list</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-numbered-list" title="Numbered list" data-trix-format="orderedList" tabindex="-1">Numbered list</button>',
                '</div>',
                '<div class="trix-button-group">',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-blockquote" title="Blockquote" data-trix-format="blockquote" tabindex="-1">Blockquote</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-undo" title="Undo" data-trix-command="undo" tabindex="-1">Undo</button>',
                '<button type="button" class="trix-button trix-button--icon trix-button--icon-redo" title="Redo" data-trix-command="redo" tabindex="-1">Redo</button>',
                '</div>',
            ].join('');

            return toolbar;
        }

        // Trix renders attachments as <figure> elements; this returns clean HTML
        // the public blog can render without any Trix runtime.
        function buildFileAttachment(file, href) {
            if (/\.(gif|png|jpe?g|webp|bmp|avif|svg)$/i.test(file)) {
                return ' <figure class="attachment attachment--preview">' +
                    '<img src="' + href + '" alt="' + file + '">' +
                    '<figcaption class="attachment__caption">' + file + '</figcaption>' +
                    '</figure>';
            }

            return ' <figure class="attachment attachment--preview">' +
                '<a href="' + href + '" class="attachment__link" target="_blank" rel="noopener">' + file + '</a>' +
                '</figure>';
        }

        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('trix-editor[data-trix-toolbar]').forEach(function (editorElement) {
                var toolbarId = editorElement.getAttribute('data-trix-toolbar');
                var toolbar = document.getElementById(toolbarId) || buildTrixToolbar(toolbarId);

                if (!toolbar.parentNode) {
                    editorElement.parentNode.insertBefore(toolbar, editorElement);
                }

                var editor = editorElement.editor || new Trix.Editor({ element: editorElement, toolbar: toolbar });

                editor.uploadHandler = function (attachment) {
                    var data = new FormData();
                    // The media endpoint validates an array under `files`.
                    data.append('files[]', attachment.file);
                    data.append('folder', 'posts');

                    return fetch(window.trixUploadUrl, {
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
                            return buildFileAttachment(json.file_name || 'attachment', json.url);
                        });
                };
            });
        });
    </script>
    @stack('scripts')
</head>
<body class="min-h-screen bg-night-900 font-grotesque text-slate-200">
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
</body>
</html>

