<?php

namespace App\Services\Ai;

use App\Services\Ai\Contracts\AiProvider;
use InvalidArgumentException;

class AiManager
{
    /** @var array<string, AiProvider> */
    protected array $providers = [];

    public function __construct(protected ?string $defaultDriver = null)
    {
        $this->defaultDriver = $defaultDriver ?? config('ai.default', 'mock');
    }

    /**
     * Resolve a provider driver instance by name.
     *
     * @param  string|null  $driver  e.g. "openai", "gemini", "mock".
     * @return AiProvider
     */
    public function driver(?string $driver = null): AiProvider
    {
        $driver = $driver ?: $this->defaultDriver;

        if (isset($this->providers[$driver])) {
            return $this->providers[$driver];
        }

        return $this->providers[$driver] = $this->resolve($driver);
    }

    /**
     * Get the list of available provider names (from config).
     *
     * @return array<int, string>
     */
    public function availableProviders(): array
    {
        return array_keys(config('ai.providers', []));
    }

    /**
     * Get the model string for a provider driver.
     */
    public function modelFor(string $driver): string
    {
        return config("ai.providers.{$driver}.model", 'default');
    }

    protected function resolve(string $driver): AiProvider
    {
        return match ($driver) {
            'openai' => new OpenAiProvider(),
            'gemini' => new GeminiProvider(),
            'mock' => new MockProvider(),
            default => throw new InvalidArgumentException("Unsupported AI provider driver: [{$driver}]."),
        };
    }
}

