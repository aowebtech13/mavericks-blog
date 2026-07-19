<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - Blog Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html {
            font-size: 18px;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        winter: {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a',
                        }
                    }
                }
            }
        }
    </script>
    <script src="https://cdn.tiny.cloud/1/bh0wgiwrkcykey62n4m5ht0d2oar14ej40mvb0ff3zyyfr4f/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script>
        tinymce.init({
            selector: 'textarea.rich-text',
            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
            toolbar: 'undo redo | blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            height: 400
        });
    </script>
    @stack('scripts')
</head>
<body class="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
    <div class="flex h-screen">
        <aside class="w-64 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-2xl overflow-y-auto">
            <div class="p-6 border-b border-slate-700">
                <h1 class="text-2xl font-bold text-white">Primus Media</h1>
                <p class="text-slate-400 text-sm mt-1">Admin Area </p>
            </div>

            <nav class="p-4 space-y-2">
                <a href="{{ route('admin.dashboard') }}" class="block px-4 py-3 rounded-lg text-slate-300 hover:bg-blue-600 hover:text-white transition {{ request()->routeIs('admin.dashboard') ? 'bg-blue-600 text-white' : '' }}">
                    📊 Dashboard
                </a>
                <a href="{{ route('admin.posts.index') }}" class="block px-4 py-3 rounded-lg text-slate-300 hover:bg-blue-600 hover:text-white transition {{ request()->routeIs('admin.posts*') ? 'bg-blue-600 text-white' : '' }}">
                    📝 Posts
                </a>
                <a href="{{ route('admin.categories.index') }}" class="block px-4 py-3 rounded-lg text-slate-300 hover:bg-blue-600 hover:text-white transition {{ request()->routeIs('admin.categories*') ? 'bg-blue-600 text-white' : '' }}">
                    📁 Categories
                </a>
                <a href="{{ route('admin.tags.index') }}" class="block px-4 py-3 rounded-lg text-slate-300 hover:bg-blue-600 hover:text-white transition {{ request()->routeIs('admin.tags*') ? 'bg-blue-600 text-white' : '' }}">
                    🏷️ Tags
                </a>
                <hr class="border-slate-700 my-2">
                <a href="{{ route('admin.password.change') }}" class="block px-4 py-3 rounded-lg text-slate-300 hover:bg-blue-600 hover:text-white transition {{ request()->routeIs('admin.password.change') ? 'bg-blue-600 text-white' : '' }}">
                    🔐 Change Password
                </a>
            </nav>

            <div class="absolute bottom-0 w-64 p-4 border-t border-slate-700 bg-slate-900">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-blue-500"></div>
                    <div>
                        <p class="text-white font-medium text-sm">{{ auth()->user()->name }}</p>
                        <form action="{{ route('admin.logout') }}" method="POST" class="inline">
                            @csrf
                            <button type="submit" class="text-slate-400 text-xs hover:text-red-400 transition">Logout</button>
                        </form>
                    </div>
                </div>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto">
            <div class="p-8">
                @if ($errors->any())
                    <div class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <ul class="list-disc list-inside">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @if (session('success'))
                    <div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {{ session('success') }}
                    </div>
                @endif

                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>
