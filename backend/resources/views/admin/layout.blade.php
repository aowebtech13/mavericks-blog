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
        /* Darker text for the CKEditor content area */
        .ck-editor__editable {
            color: #1f2937 !important;
            background-color: #ffffff !important;
        }
        .ck-editor__editable p,
        .ck-editor__editable li,
        .ck-editor__editable h1,
        .ck-editor__editable h2,
        .ck-editor__editable h3,
        .ck-editor__editable blockquote {
            color: #1f2937 !important;
        }
        .ck-editor__editable a {
            color: #007BFF !important;
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
    <script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('textarea.rich-text').forEach(function (el) {
                ClassicEditor
                    .create(el, {
                        toolbar: [
                            'heading', '|',
                            'bold', 'italic', 'link', 'bulletedList', 'numberedList',
                            'blockQuote', 'insertTable', 'imageUpload', 'mediaEmbed',
                            'undo', 'redo'
                        ]
                    })
                    .catch(function (error) {
                        console.error(error);
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
                <h1 class="text-xl font-bold tracking-wide text-white">mavericks Ai</h1>
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
                    <div class="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                        <ul class="list-inside list-disc">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @if (session('success'))
                    <div class="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
                        {{ session('success') }}
                    </div>
                @endif

                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>

