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

