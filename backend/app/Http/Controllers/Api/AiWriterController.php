<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Ai\GenerateBlogRequest;
use App\Http\Resources\PostResource;
use App\Models\AiGeneration;
use App\Services\Ai\AiManager;
use App\Services\Ai\BlogGeneratorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;

class AiWriterController extends Controller
{
    public function __construct(
        protected AiManager $manager,
        protected BlogGeneratorService $service,
    ) {
    }

    /**
     * Generate a blog post via the API.
     */
    public function generate(GenerateBlogRequest $request): JsonResponse
    {
        $input = array_merge($request->validated(), [
            'user' => $request->user(),
        ]);

        try {
            $post = $this->service->generate($input);
        } catch (RuntimeException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 422);
        }

        return (new PostResource($post))
            ->response()
            ->setStatusCode(201);
    }

   
    public function generations(Request $request): JsonResponse
    {
        $generations = AiGeneration::with('post')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->limit(50)
            ->get();

        return response()->json([
            'data' => $generations->map(function (AiGeneration $generation) {
                return [
                    'id' => $generation->id,
                    'provider' => $generation->provider,
                    'model' => $generation->model,
                    'topic' => $generation->topic,
                    'status' => $generation->status,
                    'error' => $generation->error,
                    'post' => $generation->post ? [
                        'id' => $generation->post->id,
                        'title' => $generation->post->title,
                        'slug' => $generation->post->slug,
                        'status' => $generation->post->status,
                    ] : null,
                    'created_at' => $generation->created_at?->toIso8601String(),
                ];
            }),
        ]);
    }
}

