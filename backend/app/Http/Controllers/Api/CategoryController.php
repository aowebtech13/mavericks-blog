<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Cache::remember('categories_index', now()->addHours(24), function () {
            return Category::withCount(['posts' => function ($query) {
                    $query->where('status', 'published')->where('visibility', 'public');
                }])
                ->orderBy('name')
                ->get();
        });
            
        return CategoryResource::collection($categories);
    }
}
