@extends('admin.layout')

@section('title', 'Tags')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-slate-800">Tags</h1>
        <a href="{{ route('admin.tags.create') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
            ➕ New Tag
        </a>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="w-full">
            <thead class="bg-slate-100 border-b border-slate-200">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Slug</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-slate-700">Posts</th>
                    <th class="px-6 py-4 text-center text-sm font-semibold text-slate-700">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
                @forelse($tags as $tag)
                    <tr class="hover:bg-slate-50 transition">
                        <td class="px-6 py-4">
                            <span class="text-slate-800 font-medium">{{ $tag->name }}</span>
                        </td>
                        <td class="px-6 py-4 text-slate-600 text-sm">{{ $tag->slug }}</td>
                        <td class="px-6 py-4 text-slate-600 font-medium">{{ $tag->posts_count }}</td>
                        <td class="px-6 py-4 text-center">
                            <div class="flex items-center justify-center gap-2">
                                <a href="{{ route('admin.tags.edit', $tag) }}" class="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</a>
                                <form action="{{ route('admin.tags.destroy', $tag) }}" method="POST" style="display: inline;" onsubmit="return confirm('Delete this tag?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-700 font-medium text-sm">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="px-6 py-8 text-center text-slate-500">No tags found</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">
        {{ $tags->links() }}
    </div>
</div>
@endsection
