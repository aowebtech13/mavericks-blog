@extends('admin.layout')

@section('title', 'Categories')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-white">Categories</h1>
        <a href="{{ route('admin.categories.create') }}" class="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent-purple w-full sm:w-auto">
            ➕ New Category
        </a>
    </div>

    <div class="rounded-xl border border-white/10 bg-night-800/60 overflow-hidden">
        <div class="overflow-x-auto">
        <table class="w-full min-w-[560px]">
            <thead class="border-b border-white/10 bg-night-900/60">
                <tr>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400">Name</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 hidden md:table-cell">Slug</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400">Posts</th>
                    <th class="px-4 py-3.5 text-left text-sm font-semibold text-slate-400 hidden lg:table-cell">Color</th>
                    <th class="px-4 py-3.5 text-center text-sm font-semibold text-slate-400">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
                @forelse($categories as $category)
                    <tr class="transition hover:bg-white/5">
                        <td class="px-4 py-3.5">
                            <span class="font-medium text-white">{{ $category->name }}</span>
                        </td>
                        <td class="px-4 py-3.5 hidden md:table-cell text-sm text-slate-400">{{ $category->slug }}</td>
                        <td class="px-4 py-3.5 font-medium text-slate-300">{{ $category->posts_count }}</td>
                        <td class="px-4 py-3.5 hidden lg:table-cell">
                            <div class="flex items-center space-x-2">
                                <div class="h-6 w-6 rounded border border-white/10" style="background-color: {{ $category->color }}"></div>
                                <span class="text-xs text-slate-500">{{ $category->color }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3.5 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <a href="{{ route('admin.categories.edit', $category) }}" class="text-accent hover:text-white font-medium text-sm">Edit</a>
                                <form action="{{ route('admin.categories.destroy', $category) }}" method="POST" style="display: inline;" onsubmit="return confirm('Delete this category? Associated posts will be updated.')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-6 py-8 text-center text-slate-500">No categories found</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        </div>
    </div>

    <div class="mt-6">
        {{ $categories->links() }}
    </div>
</div>
@endsection
