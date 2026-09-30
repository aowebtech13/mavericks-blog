<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'file_name',
        'path',
        'mime_type',
        'disk',
        'size',
        'title',
        'alt_text',
        'folder',
    ];

    protected $casts = [
        'size' => 'integer',
    ];

    /**
     * Extensions treated as images in the library UI.
     */
    public const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];

    /**
     * Allowed upload types for the media library.
     */
    public const ALLOWED_MIMES = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif',
        'application/pdf',
        'video/mp4', 'video/webm',
        'audio/mpeg', 'audio/wav', 'audio/ogg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Public URL for the file.
     *
     * The /storage symlink is blocked on the production server, so we route
     * through the media.show endpoint which streams straight from the public disk.
     */
    public function getUrlAttribute(): string
    {
        return route('media.show', ['path' => $this->path]);
    }

    public function isImage(): bool
    {
        return str_starts_with((string) $this->mime_type, 'image/');
    }

    public function extension(): string
    {
        return Str::lower(pathinfo((string) $this->file_name, PATHINFO_EXTENSION));
    }

    public function isVideo(): bool
    {
        return str_starts_with((string) $this->mime_type, 'video/');
    }

    public function isAudio(): bool
    {
        return str_starts_with((string) $this->mime_type, 'audio/');
    }

    /**
     * Human readable file size, e.g. "1.4 MB".
     */
    public function humanSize(): string
    {
        $bytes = (int) $this->size;

        if ($bytes <= 0) {
            return '0 B';
        }

        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $power = min((int) floor(log($bytes, 1024)), count($units) - 1);

        return round($bytes / (1024 ** $power), $power === 0 ? 0 : 1).' '.$units[$power];
    }

    /**
     * Delete the underlying file when the record is removed.
     */
    protected static function boot(): void
    {
        parent::boot();

        static::deleting(function (self $media) {
            if ($media->path && Storage::disk($media->disk ?: 'public')->exists($media->path)) {
                Storage::disk($media->disk ?: 'public')->delete($media->path);
            }
        });
    }

    public function scopeImages($query)
    {
        return $query->where('mime_type', 'LIKE', 'image/%');
    }

    public function scopeSearch($query, ?string $term)
    {
        if (blank($term)) {
            return $query;
        }

        $like = '%'.$term.'%';

        return $query->where(function ($q) use ($like) {
            $q->where('file_name', 'LIKE', $like)
                ->orWhere('title', 'LIKE', $like)
                ->orWhere('alt_text', 'LIKE', $like)
                ->orWhere('folder', 'LIKE', $like);
        });
    }

    public function scopeOfType($query, ?string $type)
    {
        return match ($type) {
            'image' => $query->images(),
            'video' => $query->where('mime_type', 'LIKE', 'video/%'),
            'audio' => $query->where('mime_type', 'LIKE', 'audio/%'),
            'document' => $query->where(function ($q) {
                $q->where('mime_type', 'LIKE', 'application/%')
                    ->orWhere('mime_type', 'LIKE', 'text/%');
            }),
            default => $query,
        };
    }
}
