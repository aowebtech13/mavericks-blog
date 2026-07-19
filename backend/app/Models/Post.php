<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Cache;

class Post extends Model
{
    use HasFactory;

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'status',
        'visibility',
        'published_at',
        'scheduled_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'scheduled_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saved(function ($post) {
            static::clearCache($post->id);
        });

        static::deleted(function ($post) {
            static::clearCache($post->id);
        });
    }

    public static function clearCache($postId = null)
    {
        Cache::forget('posts_version');
        Cache::forget('categories_index');
        Cache::forget('tags_index');
        Cache::forget('tags_popular');
        
        if ($postId) {
            Cache::forget("post_show_{$postId}");
        }
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->where('visibility', 'public');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }
}
