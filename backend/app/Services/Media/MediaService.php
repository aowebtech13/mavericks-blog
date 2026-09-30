<?php

namespace App\Services\Media;

use App\Models\Media;
use App\Models\Post;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
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
     * Cache key holding the timestamp of the last automatic library sync.
     */
    public const SYNC_CACHE_KEY = 'media_last_sync';

    /**
     * Minimum number of seconds between two automatic syncs. The media grid
     * triggers a sync on every visit, so it has to stay cheap.
     */
    public const SYNC_THROTTLE_SECONDS = 600;

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
        $fileName = $attributes['file_name'] ?? basename($path);

        // Never blank out a title an admin already curated.
        $title = $attributes['title'] ?? $this->defaultTitle($fileName);

        return Media::updateOrCreate(
            ['path' => $path, 'disk' => self::DISK],
            [
                'user_id' => $userId,
                'file_name' => $fileName,
                'mime_type' => $mime,
                'size' => Storage::disk(self::DISK)->size($path),
                'title' => $title,
                'alt_text' => $attributes['alt_text'] ?? null,
                'folder' => $attributes['folder'] ?? $this->folderFor($path),
            ]
        );
    }

    /**
     * Derive the logical folder from a disk path ("posts/2026/a.jpg" -> "posts").
     */
    private function folderFor(string $path): string
    {
        if (! Str::contains($path, '/')) {
            return 'library';
        }

        return Str::beforeLast($path, '/');
    }

    /**
     * Register every file that already lives on the public disk but is missing
     * from the media table, plus every image path referenced by a post.
     *
     * This backfills the library after it was introduced on a site that had
     * uploads predating the media table (and after restoring a backup).
     *
     * @return array{registered: int, refreshed: int, removed: int}
     */
    public function sync(bool $pruneMissing = false): array
    {
        $disk = Storage::disk(self::DISK);
        $registered = 0;
        $refreshed = 0;

        // 1. Adopt every file sitting on disk that has no media record yet.
        $known = Media::query()
            ->where('disk', self::DISK)
            ->pluck('path')
            ->flip();

        foreach ($disk->allFiles() as $path) {
            $path = ltrim($path, '/');

            if ($known->has($path) || ! $this->isScannable($path)) {
                continue;
            }

            if ($this->registerExisting($path)) {
                $registered++;
            }
        }

        // 2. Adopt post images that are stored on disk but live outside the
        //    library (e.g. assigned by path in an earlier version).
        foreach ($this->referencedPostImagePaths() as $path) {
            if ($known->has($path) || ! $disk->exists($path)) {
                continue;
            }

            if ($this->registerExisting($path, $this->ownerForPath($path))) {
                $registered++;
            }
        }

        // 3. Keep metadata (size, mime) accurate for files that drifted.
        $refreshed = $this->refreshStaleMetadata();

        // 4. Optionally drop records whose file disappeared from disk.
        $removed = $pruneMissing ? $this->pruneMissingFiles() : 0;

        Cache::forget('media_stats');
        Cache::put(self::SYNC_CACHE_KEY, now()->timestamp, now()->addDay());

        return compact('registered', 'refreshed', 'removed');
    }

    /**
     * Run a sync at most once every SYNC_THROTTLE_SECONDS seconds so opening
     * the media grid stays cheap. Always syncs when the table is empty.
     *
     * @return array{registered: int, refreshed: int, removed: int}|null
     */
    public function syncIfStale(): ?array
    {
        $last = (int) Cache::get(self::SYNC_CACHE_KEY, 0);

        if ($last > 0 && (time() - $last) < self::SYNC_THROTTLE_SECONDS) {
            return null;
        }

        return $this->sync();
    }

    /**
     * Remove media rows whose underlying file no longer exists on disk.
     */
    public function pruneMissingFiles(): int
    {
        $disk = Storage::disk(self::DISK);
        $removed = 0;

        Media::query()
            ->where('disk', self::DISK)
            ->chunkById(200, function ($records) use ($disk, &$removed) {
                foreach ($records as $media) {
                    if (! $media->path || $disk->exists($media->path)) {
                        continue;
                    }

                    // Delete the row directly: the model event would also try to
                    // remove the (already missing) file from disk.
                    $media->delete();
                    $removed++;
                }
            });

        return $removed;
    }

    /**
     * Decide whether a file found on disk belongs in the library.
     *
     * Skips dotfiles (.gitignore, .DS_Store) and zero-byte placeholders.
     */
    private function isScannable(string $path): bool
    {
        if (str_contains($path, '/.')) {
            return false;
        }

        foreach (explode('/', $path) as $segment) {
            if (str_starts_with($segment, '.')) {
                return false;
            }
        }

        return true;
    }

    /**
     * Update size/mime metadata for records that no longer match the file.
     */
    private function refreshStaleMetadata(): int
    {
        $disk = Storage::disk(self::DISK);
        $refreshed = 0;

        Media::query()
            ->where('disk', self::DISK)
            ->chunkById(200, function ($records) use ($disk, &$refreshed) {
                foreach ($records as $media) {
                    if (! $media->path || ! $disk->exists($media->path)) {
                        continue;
                    }

                    $size = (int) $disk->size($media->path);
                    $mime = $disk->mimeType($media->path) ?: $media->mime_type;

                    if ($size === (int) $media->size && $mime === $media->mime_type) {
                        continue;
                    }

                    $media->forceFill([
                        'size' => $size,
                        'mime_type' => $mime,
                    ])->save();

                    $refreshed++;
                }
            });

        return $refreshed;
    }

    /**
     * Collect image paths referenced by posts that live on the local disk.
     *
     * Remote URLs (picsum, cdn, …) are ignored: there is no local file to
     * register.
     *
     * @return array<int, string>
     */
    private function referencedPostImagePaths(): array
    {
        $disk = Storage::disk(self::DISK);
        $paths = [];

        Post::query()
            ->whereNotNull('featured_image')
            ->select(['id', 'featured_image'])
            ->chunkById(200, function ($posts) use (&$paths, $disk) {
                foreach ($posts as $post) {
                    foreach ($this->localPathsFromReference((string) $post->featured_image) as $path) {
                        if ($disk->exists($path)) {
                            $paths[] = $path;
                        }
                    }
                }
            });

        return array_values(array_unique($paths));
    }

    /**
     * Convert a stored image reference into candidate disk-relative paths.
     *
     * Handles bare paths ("posts/a.jpg") as well as /media/... and
     * /storage/... URLs, returning every variant that could exist on disk.
     * External URLs and non-image references yield an empty array.
     *
     * @return array<int, string>
     */
    private function localPathsFromReference(string $reference): array
    {
        $reference = trim($reference);

        if ($reference === '' || Str::startsWith($reference, ['http://', 'https://', '//', 'data:'])) {
            return [];
        }

        // Strip the host from a local absolute URL such as
        // http://example.test/storage/posts/a.jpg
        if (preg_match('#^https?://[^/]+/#i', $reference, $m)) {
            $reference = Str::after($reference, $m[0]);
        }

        $reference = ltrim($reference, '/');
        $reference = preg_replace('#\?.*$#', '', $reference) ?? $reference;
        $reference = ltrim($reference, '/');

        if ($reference === '' || str_contains($reference, '..')) {
            return [];
        }

        $extension = Str::lower(pathinfo($reference, PATHINFO_EXTENSION));

        if (! in_array($extension, Media::IMAGE_EXTENSIONS, true)) {
            return [];
        }

        $candidates = [$reference];

        foreach (['media/', 'storage/'] as $prefix) {
            if (Str::startsWith($reference, $prefix)) {
                array_unshift($candidates, Str::after($reference, $prefix));
            }
        }

        return array_values(array_unique($candidates));
    }

    /**
     * Best-effort owner for an adopted file: the author of the post using it.
     */
    private function ownerForPath(string $path): ?int
    {
        $post = Post::query()
            ->where('featured_image', 'like', '%'.$path)
            ->first();

        return $post?->user_id;
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
