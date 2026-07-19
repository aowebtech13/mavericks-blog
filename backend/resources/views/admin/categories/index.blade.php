@extends('admin.layout')

@section('title', 'Categories')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-slate-800">Categories</h1>
        <a href="{{ route('admin.categories.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
            ➕ New Category
        </a>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
            <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Slug</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Posts</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Color</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
                @forelse($categories as $category)
                    <tr class="hover:bg-slate-50 transition">
                        <td class="px-6 py-4">
                            <span class="text-slate-800 font-medium">{{ $category->name }}</span>
                        </td>
                        <td class="px-6 py-4 text-slate-600 text-sm">{{ $category->slug }}</td>
                        <td class="px-6 py-4 text-slate-600 font-medium">{{ $category->posts_count }}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center space-x-2">
                                <div class="w-6 h-6 rounded border border-slate-200" style="background-color: {{ $category->color }}"></div>
                                <span class="text-xs text-slate-500">{{ $category->color }}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <a href="{{ route('admin.categories.edit', $category) }}" class="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</a>
                                <form action="{{ route('admin.categories.destroy', $category) }}" method="POST" style="display: inline;" onsubmit="return confirm('Delete this category? Associated posts will be updated.')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button>
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

    <div class="mt-6">
        {{ $categories->links() }}
    </div>
</div>
@endsection
