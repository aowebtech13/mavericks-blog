<?php

namespace App\Services\Ai;

use App\Services\Ai\Contracts\AiProvider;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class OpenAiProvider implements AiProvider
{
    public function generate(string $systemPrompt, string $userPrompt, string $model): string
    {
        $config = config('ai.providers.openai');
        $key = $config['key'] ?? null;

        if (blank($key)) {
            throw new RuntimeException('OpenAI API key is not configured. Set OPENAI_API_KEY in your .env file.');
        }

        $response = Http::timeout($config['timeout'] ?? 120)
            ->withToken($key)
            ->withHeaders(['Accept' => 'application/json'])
            ->post(rtrim($config['base_url'] ?? 'https://api.openai.com/v1', '/') . '/chat/completions', [
                'model' => $model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userPrompt],
                ],
                'temperature' => 0.8,
                'max_tokens' => 4096,
            ]);

        if ($response->failed()) {
            $message = $response->json('error.message') ?? $response->body();
            throw new RuntimeException('OpenAI request failed: ' . $message);
        }

        $content = $response->json('choices.0.message.content');

        if (!is_string($content) || blank($content)) {
            throw new RuntimeException('OpenAI returned an empty response.');
        }

        return $content;
    }

    public function name(): string
    {
        return 'openai';
    }
}

