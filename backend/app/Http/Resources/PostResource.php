<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featured_image
                ? (filter_var($this->featured_image, FILTER_VALIDATE_URL)
                    ? $this->featured_image
                    : $this->mediaUrl($this->featured_image))
                : null,
            'status' => $this->status,
            'visibility' => $this->visibility,
            'ai_generated' => $this->ai_generated,
            'views_count' => $this->views_count,
            'published_at' => $this->published_at?->toIso8601String(),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
            'user' => $this->user ? [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ] : null,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
        ];
    }

    /**
     * Build a URL for the public media route that serves a file from
     * storage/app/public. This bypasses the /storage symlink which may be
     * blocked or misconfigured on the production server.
     */
    protected function mediaUrl(string $path): string
    {
        $path = ltrim($path, '/');
        $path = str_replace('..', '', $path);

        return url('/media/' . $path);
    }
}
