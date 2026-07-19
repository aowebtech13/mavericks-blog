<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html {
            font-size: 18px;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white mb-2">🔄 Reset Password</h1>
            <p class="text-slate-400">Enter the OTP and your new password</p>
        </div>

        @if (session('status'))
            <div class="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-400 rounded-xl text-sm">
                {{ session('status') }}
            </div>
        @endif

        @if ($errors->any())
            <div class="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl text-sm">
                <ul class="list-disc list-inside">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('admin.password.update') }}" method="POST" class="space-y-6">
            @csrf
            <input type="hidden" name="email" value="{{ $email }}">

            <div>
                <label for="otp" class="block text-sm font-medium text-slate-300 mb-2">OTP (6 Digits)</label>
                <input type="text" name="otp" id="otp" required autofocus
                    class="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-center text-2xl tracking-widest">
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                <input type="password" name="password" id="password" required
                    class="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            </div>

            <div>
                <label for="password_confirmation" class="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                <input type="password" name="password_confirmation" id="password_confirmation" required
                    class="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            </div>

            <button type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                Reset Password
            </button>

            <div class="text-center">
                <a href="{{ route('admin.login') }}" class="text-sm text-blue-400 hover:text-blue-300 transition">Back to Login</a>
            </div>
        </form>
    </div>
</body>
</html>