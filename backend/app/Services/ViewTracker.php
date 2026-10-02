<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ViewTracker
{
    /**
     * Record a view for the given post and return the fresh, authoritative
     * view count.
     *
     * De-duplication is done with a short-lived cache key built from the
     * post id plus a coarse visitor fingerprint (IP + user agent). This keeps
     * refreshes, React strict-mode double effects and router prefetches from
     * inflating the counter while still counting genuinely new readers.
     */
    public function record(Post $post, ?Request $request = null): int
    {
        if (!$this->shouldCount($post, $request)) {
            return $this->currentCount($post);
        }

        $key = $this->dedupeKey($post, $request);
        $ttl = max(1, (int) config('views.dedupe_seconds', 1800));

        // Cache::add() is atomic: it only returns true the first time the key
        // is seen inside the window, so concurrent requests cannot double count.
        if (Cache::add($key, 1, $ttl)) {
            $this->increment($post);
        }

        return $this->currentCount($post);
    }

    /**
     * Atomically bump the counter in the database and keep the in-memory model
     * in sync so the caller can render the new value immediately.
     */
    protected function increment(Post $post): void
    {
        Post::withoutTimestamps(function () use ($post) {
            DB::table('posts')->where('id', $post->getKey())->increment('views_count');
        });

        $post->views_count = $this->currentCount($post);

        // Any cached payload holding this post now carries a stale counter.
        Post::clearCache($post->getKey());
    }

    /**
     * Read the counter straight from the database, bypassing any cache.
     */
    public function currentCount(Post $post): int
    {
        return (int) DB::table('posts')->where('id', $post->getKey())->value('views_count');
    }

    /**
     * Decide whether this hit should be counted at all.
     */
    protected function shouldCount(Post $post, ?Request $request): bool
    {
        if ($post->status !== 'published' || $post->visibility !== 'public') {
            return false;
        }

        if (config('views.only_published', true) && $post->status !== 'published') {
            return false;
        }

        // Prefetch / metadata requests never represent a reader.
        if ($request && $request->headers->has('X-Prefetch')
            || $request && $request->headers->get('Purpose') === 'prefetch'
            || $request && $request->headers->get('X-Moz') === 'prefetch') {
            return false;
        }

        if ($request && config('views.ignore_bots', true) && $this->looksLikeBot($request)) {
            return false;
        }

        return true;
    }

    /**
     * Very small bot heuristic based on the user agent header.
     */
    protected function looksLikeBot(Request $request): bool
    {
        $agent = (string) $request->header('User-Agent', '');

        if ($agent === '') {
            return true;
        }

        foreach ((array) config('views.bot_patterns', []) as $needle) {
            if ($needle !== '' && Str::contains(Str::lower($agent), Str::lower($needle))) {
                return true;
            }
        }

        return false;
    }

    /**
     * Build the de-duplication cache key for a visitor/post pair.
     */
    protected function dedupeKey(Post $post, ?Request $request): string
    {
        $visitor = 'cli';

        if ($request) {
            $visitor = hash('sha256', implode('|', [
                $request->ip() ?? 'unknown',
                $request->header('User-Agent', 'unknown'),
            ]));
        }

        return "post_view_{$post->getKey()}_{$visitor}";
    }
}
