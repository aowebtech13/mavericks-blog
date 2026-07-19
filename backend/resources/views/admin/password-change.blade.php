@extends('admin.layout')

@section('title', 'Change Password')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-8">
            <h1 class="text-2xl font-bold text-slate-800 mb-6">🔐 Change Password</h1>

            @if (session('status') === 'password-updated')
                <div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                    Password updated successfully.
                </div>
            @endif

            <form action="{{ route('admin.password.change.update') }}" method="POST" class="space-y-6">
                @csrf

                <div>
                    <label for="current_password" class="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                    <input type="password" name="current_password" id="current_password" required
                        class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                    <input type="password" name="password" id="password" required
                        class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                </div>

                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" required
                        class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                </div>

                <div class="flex items-center justify-end">
                    <button type="submit" 
                        class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition shadow-md active:scale-[0.98]">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection