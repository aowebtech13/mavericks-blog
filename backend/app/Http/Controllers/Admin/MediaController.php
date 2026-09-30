<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Media\UploadMediaRequest;
use App\Models\Media;
use App\Services\Media\MediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;

class MediaController extends Controller
{
    public function __construct(private readonly MediaService $mediaService) {}

    public function index(Request $request): View
    {
        $search = trim((string) $request->input('search', ''));
        $type = $request->input('type');
        $sort = $request->input('sort', 'newest');
        $folder = $request->input('folder');

        $query = Media::query()
            ->ofType($type)
            ->search($search)
            ->when($folder, fn ($q) => $q->where('folder', $folder));

        match ($sort) {
            'oldest' => $query->oldest(),
            'name' => $query->orderBy('file_name'),
            'largest' => $query->orderByDesc('size'),
            default => $query->latest(),
        };

        $media = $query->paginate(24)->withQueryString();

        $stats = Cache::remember('media_stats', 300, fn () => [
            'total' => Media::count(),
            'images' => Media::images()->count(),
            'size' => (int) Media::sum('size'),
        ]);

        $folders = Media::query()
            ->whereNotNull('folder')
            ->distinct()
            ->orderBy('folder')
            ->pluck('folder');

        return view('admin.media.index', compact('media', 'stats', 'folders', 'search', 'type', 'sort', 'folder'));
    }

    /**
     * Upload one or more files into the library.
     */
    public function store(UploadMediaRequest $request): RedirectResponse
    {
        $files = $request->file('files', []);
        $folder = $request->input('folder', 'library');
        $userId = $request->user()->id;

        $uploaded = [];

        foreach ($files as $file) {
            $uploaded[] = $this->mediaService->store($file, $userId, [
                'folder' => $folder,
                'alt_text' => $request->input('alt_text'),
            ]);
        }

        $count = count($uploaded);
        $message = $count === 1
            ? 'File uploaded successfully!'
            : "{$count} files uploaded successfully!";

        return redirect()->route('admin.media.index')->with('success', $message);
    }

    /**
     * Update metadata (title / alt text) for a file.
     */
    public function update(Request $request, Media $medium): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'folder' => ['nullable', 'string', 'max:100'],
        ]);

        $medium->update($validated);

        return back()->with('success', 'File details updated successfully!');
    }

    public function destroy(Media $medium): RedirectResponse
    {
        $this->mediaService->delete($medium);

        return back()->with('success', 'File deleted successfully!');
    }

    /**
     * Delete several files at once from the library grid.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['integer', 'exists:media,id'],
        ]);

        $media = Media::whereIn('id', $validated['ids'])->get();
        $count = $media->count();

        foreach ($media as $item) {
            $this->mediaService->delete($item);
        }

        return back()->with('success', "{$count} file(s) deleted successfully!");
    }

    // JSON list powering the media picker used by the rich-text editors.
    public function list(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search' => ['nullable', 'string', 'max:120'],
            'type' => ['nullable', 'string', 'in:image,video,audio,document'],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $perPage = $validated['per_page'] ?? 24;

        $media = Media::query()
            ->ofType($validated['type'] ?? null)
            ->search($validated['search'] ?? null)
            ->latest()
            ->paginate($perPage);

        return response()->json([
            'data' => collect($media->items())->map(fn (Media $item) => $this->transform($item))->all(),
            'meta' => [
                'current_page' => $media->currentPage(),
                'last_page' => $media->lastPage(),
                'per_page' => $media->perPage(),
                'total' => $media->total(),
            ],
        ]);
    }

    // JSON upload endpoint. Returns the stored file so rich-text editors can
    // insert it immediately without a page reload.
    public function uploadJson(UploadMediaRequest $request): JsonResponse
    {
        $file = $request->file('files.0') ?? $request->file('files')[0] ?? $request->file('file');

        if (! $file) {
            return response()->json(['message' => 'No file received.'], 422);
        }

        $media = $this->mediaService->store($file, $request->user()->id, [
            'folder' => $request->input('folder', 'library'),
            'alt_text' => $request->input('alt_text'),
        ]);

        return response()->json($this->transform($media), 201);
    }

    // Normalized payload shared by every JSON response.
    private function transform(Media $media): array
    {
        return [
            'id' => $media->id,
            'file_name' => $media->file_name,
            'url' => $media->url,
            'path' => $media->path,
            'mime_type' => $media->mime_type,
            'size' => $media->size,
            'human_size' => $media->humanSize(),
            'title' => $media->title,
            'alt_text' => $media->alt_text,
            'folder' => $media->folder,
            'is_image' => $media->isImage(),
            'is_video' => $media->isVideo(),
            'is_audio' => $media->isAudio(),
            'created_at' => $media->created_at?->toIso8601String(),
        ];
    }
}
