<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saved(function ($tag) {
            Post::clearCache();
        });

        static::deleted(function ($tag) {
            Post::clearCache();
        });
    }
}
