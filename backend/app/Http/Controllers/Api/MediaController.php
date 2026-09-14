<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    /**
     * Stream a file from the private storage by path, bypassing the /storage/ symlink.
     *
     * This route exists because the /storage/ symlink is blocked on the production
     * server (LiteSpeed htaccess returns 403 for /storage/*).
     *
     * @param  string  $path  e.g. "posts/FqXxbYctCC3zoWuMc5f0dwWtrTRVs7M4SJxeBCpf.jpg"
     * @return \Illuminate\Http\Response
     */
    public function stream(string $path)
    {
        $path = ltrim($path, '/');

        // Security: prevent directory traversal
        if (str_contains($path, '..')) {
            abort(403);
        }

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        $file = Storage::disk('public')->get($path);
        $mimeType = Storage::disk('public')->mimeType($path);

        return response($file, 200, [
            'Content-Type' => $mimeType,
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }
}

