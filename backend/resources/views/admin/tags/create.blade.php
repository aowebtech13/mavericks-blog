@extends('admin.layout')

@section('title', 'New Tag')

@section('content')
<div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-slate-800">New Tag</h1>
        <a href="{{ route('admin.tags.index') }}" class="text-slate-500 hover:text-slate-800 font-medium transition flex items-center">
            ← Back to List
        </a>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <form action="{{ route('admin.tags.store') }}" method="POST" class="p-8 space-y-6">
            @csrf

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="name" class="block text-sm font-semibold text-slate-700 mb-2">Tag Name</label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required placeholder="e.g., PHP" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                </div>

                <div>
                    <label for="slug" class="block text-sm font-semibold text-slate-700 mb-2">Slug (optional)</label>
                    <input type="text" name="slug" id="slug" value="{{ old('slug') }}" placeholder="e.g., php" class="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
                </div>
            </div>

            <div class="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <a href="{{ route('admin.tags.index') }}" class="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium transition">Cancel</a>
                <button type="submit" class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition">
                    Create Tag
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
