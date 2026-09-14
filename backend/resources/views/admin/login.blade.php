<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Blog Admin</title>
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
                        },
                        accent: {
                            DEFAULT: '#007BFF',
                            purple: '#7E27E2',
                        },
                    },
                },
            },
        };
    </script>
</head>
<body class="flex min-h-screen items-center justify-center bg-night-950 p-4 font-grotesque">
    <div class="w-full max-w-md">
        <div class="mb-10 text-center">
            <h1 class="text-3xl font-bold tracking-wide text-white">mavericksAi</h1>
            <p class="mt-2 text-base text-slate-500">Sign in to the admin dashboard</p>
        </div>

        <div class="rounded-xl border border-white/10 bg-night-900/80 p-8 shadow-2xl">
            @if ($errors->any())
                <div class="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                    <ul class="list-inside list-disc">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('admin.login.submit') }}" method="POST" class="space-y-5">
                @csrf
                <div>
                    <label for="email" class="mb-1.5 block text-sm font-medium text-slate-400">Email Address</label>
                    <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div>
                    <label for="password" class="mb-1.5 block text-sm font-medium text-slate-400">Password</label>
                    <input type="password" name="password" id="password" required
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div class="flex items-center justify-between pt-1">
                    <label class="flex items-center text-sm text-slate-500">
                        <input type="checkbox" name="remember" id="remember" class="mr-2 h-4 w-4 rounded border-white/10 bg-night-950 text-accent focus:ring-accent">
                        Remember me
                    </label>
                    <a href="{{ route('admin.password.request') }}" class="text-sm text-accent transition hover:text-white">Forgot Password?</a>
                </div>

                <button type="submit"
                    class="w-full rounded-lg bg-accent py-3 text-base font-bold text-white transition hover:bg-accent-purple active:scale-[0.98]">
                    Sign In
                </button>
            </form>
        </div>
    </div>
</body>
</html>

