<?php

namespace App\Http\Controllers\Api;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use App\Http\Resources\TagResource;
use Illuminate\Support\Facades\Cache;

class TagController extends Controller
{
    public function index()
    {
        $tags = Cache::remember('tags_index', now()->addHours(24), function () {
            return Tag::all();
        });
        return TagResource::collection($tags);
    }

    public function popular()
    {
        $tags = Cache::remember('tags_popular', now()->addHours(24), function () {
            return Tag::withCount('posts')
                ->orderBy('posts_count', 'desc')
                ->limit(10)
                ->get();
        });

        return TagResource::collection($tags);
    }
}
