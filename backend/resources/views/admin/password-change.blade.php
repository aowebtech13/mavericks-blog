@extends('admin.layout')

@section('title', 'Change Password')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="rounded-xl border border-white/10 bg-night-800/60 overflow-hidden">
        <div class="p-6 md:p-8">
            <h1 class="text-2xl font-bold text-white mb-6">🔐 Change Password</h1>

            @if (session('status') === 'password-updated')
                <div class="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
                    Password updated successfully.
                </div>
            @endif

            <form action="{{ route('admin.password.change.update') }}" method="POST" class="space-y-5">
                @csrf

                <div>
                    <label for="current_password" class="mb-1.5 block text-sm font-medium text-slate-400">Current Password</label>
                    <input type="password" name="current_password" id="current_password" required
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div>
                    <label for="password" class="mb-1.5 block text-sm font-medium text-slate-400">New Password</label>
                    <input type="password" name="password" id="password" required
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div>
                    <label for="password_confirmation" class="mb-1.5 block text-sm font-medium text-slate-400">Confirm New Password</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" required
                        class="w-full rounded-lg border border-white/10 bg-night-950 px-4 py-2.5 text-base text-white transition focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                </div>

                <div class="flex items-center justify-end pt-2">
                    <button type="submit" 
                        class="rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple active:scale-[0.98]">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

