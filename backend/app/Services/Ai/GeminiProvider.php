<?php

namespace App\Services\Ai;

use App\Services\Ai\Contracts\AiProvider;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class GeminiProvider implements AiProvider
{
    public function generate(string $systemPrompt, string $userPrompt, string $model): string
    {
        $config = config('ai.providers.gemini');
        $key = $config['key'] ?? null;

        if (blank($key)) {
            throw new RuntimeException('Gemini API key is not configured. Set GEMINI_API_KEY in your .env file.');
        }

        $baseUrl = rtrim($config['base_url'] ?? 'https://generativelanguage.googleapis.com/v1beta', '/');
        $url = $baseUrl . '/models/' . $model . ':generateContent?key=' . $key;

        $response = Http::timeout($config['timeout'] ?? 120)
            ->withHeaders(['Accept' => 'application/json'])
            ->post($url, [
                'systemInstruction' => [
                    'parts' => [['text' => $systemPrompt]],
                ],
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [['text' => $userPrompt]],
                    ],
                ],
                'generationConfig' => [
                    'temperature' => 0.8,
                    'maxOutputTokens' => 4096,
                ],
            ]);

        if ($response->failed()) {
            $message = $response->json('error.message') ?? $response->body();
            throw new RuntimeException('Gemini request failed: ' . $message);
        }

        $parts = $response->json('candidates.0.content.parts');
        if (empty($parts)) {
            throw new RuntimeException('Gemini returned an empty response.');
        }

        $content = collect($parts)->pluck('text')->implode("\n");

        if (blank($content)) {
            throw new RuntimeException('Gemini returned an empty response.');
        }

        return $content;
    }

    public function name(): string
    {
        return 'gemini';
    }
}

