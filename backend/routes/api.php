<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\CategoryController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('posts', PostController::class);
Route::get('/tags', [TagController::class, 'index']);
Route::get('/tags/popular', [TagController::class, 'popular']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/posts/search', [PostController::class, 'search']);
Route::post('/posts/bulk-action', [PostController::class, 'bulk']);
