<?php

namespace App\Services\Media;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaService
{
    /**
     * Disk used for all library assets. Kept configurable so the library can
     * later be moved to S3 without touching the controllers.
     */
    public const DISK = 'public';

    /**
     * Persist an uploaded file and register it in the media library.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function store(UploadedFile $file, ?int $userId = null, array $attributes = []): Media
    {
        $folder = $attributes['folder'] ?? 'library';
        $path = $file->store($folder, self::DISK);

        return Media::create([
            'user_id' => $userId,
            'file_name' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getMimeType() ?: 'application/octet-stream',
            'disk' => self::DISK,
            'size' => Storage::disk(self::DISK)->size($path),
            'title' => $attributes['title'] ?? $this->defaultTitle($file->getClientOriginalName()),
            'alt_text' => $attributes['alt_text'] ?? null,
            'folder' => $folder,
        ]);
    }

    /**
     * Register an already-stored file (used to adopt existing uploads, e.g. posts).
     */
    public function registerExisting(string $path, ?int $userId = null, array $attributes = []): ?Media
    {
        if (! Storage::disk(self::DISK)->exists($path)) {
            return null;
        }

        $mime = Storage::disk(self::DISK)->mimeType($path) ?: 'application/octet-stream';

        return Media::updateOrCreate(
            ['path' => $path, 'disk' => self::DISK],
            [
                'user_id' => $userId,
                'file_name' => $attributes['file_name'] ?? basename($path),
                'mime_type' => $mime,
                'size' => Storage::disk(self::DISK)->size($path),
                'title' => $attributes['title'] ?? null,
                'alt_text' => $attributes['alt_text'] ?? null,
                'folder' => $attributes['folder'] ?? Str::beforeLast($path, '/'),
            ]
        );
    }

    /**
     * Delete a media record together with its underlying file.
     */
    public function delete(Media $media): void
    {
        $disk = $media->disk ?: self::DISK;

        if ($media->path && Storage::disk($disk)->exists($media->path)) {
            Storage::disk($disk)->delete($media->path);
        }

        $media->delete();
    }

    /**
     * Build a readable title from the original file name.
     */
    private function defaultTitle(string $fileName): string
    {
        return Str::of(pathinfo($fileName, PATHINFO_FILENAME))
            ->replace(['-', '_'], ' ')
            ->squish()
            ->title()
            ->limit(120, '')
            ->toString();
    }
}
