<?php

namespace App\Services\Ai\Contracts;

interface AiProvider
{
    /**
     * Generate a completion from the given prompt.
     *
     * @param  string  $systemPrompt  System-level instructions for the model.
     * @param  string  $userPrompt    The user/task prompt.
     * @param  string  $model         Model identifier (e.g. gpt-4o-mini, gemini-1.5-flash).
     * @return string                 Raw model output (expected to be JSON).
     *
     * @throws \RuntimeException When the provider request fails.
     */
    public function generate(string $systemPrompt, string $userPrompt, string $model): string;

    /**
     * Human friendly provider name.
     */
    public function name(): string;
}

