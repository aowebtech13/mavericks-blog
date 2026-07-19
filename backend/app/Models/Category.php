<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'color'];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saved(function ($category) {
            Post::clearCache();
        });

        static::deleted(function ($category) {
            Post::clearCache();
        });

        static::deleting(function ($category) {
            $category->posts()->update(['category_id' => null]);
        });
    }
}
