<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default AI Writer Provider
    |--------------------------------------------------------------------------
    |
    | This option controls the default AI provider used for blog generation.
    | Supported drivers: "openai", "gemini", "mock"
    |
    */

    'default' => env('AI_WRITER_PROVIDER', 'mock'),

    /*
    |--------------------------------------------------------------------------
    | AI Providers
    |--------------------------------------------------------------------------
    |
    | Configuration for each supported provider. Keys are read from your .env
    | file. The "mock" provider is a deterministic demo generator that does not
    | require any API key, ideal for local development and testing.
    |
    */

    'providers' => [

        'openai' => [
            'driver' => 'openai',
            'key' => env('OPENAI_API_KEY'),
            'base_url' => env('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
            'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),
            'timeout' => env('AI_WRITER_TIMEOUT', 120),
        ],

        'gemini' => [
            'driver' => 'gemini',
            'key' => env('GEMINI_API_KEY'),
            'base_url' => env('GEMINI_BASE_URL', 'https://generativelanguage.googleapis.com/v1beta'),
            'model' => env('GEMINI_MODEL', 'gemini-1.5-flash'),
            'timeout' => env('AI_WRITER_TIMEOUT', 120),
        ],

        'mock' => [
            'driver' => 'mock',
            'model' => 'mock-1',
            'timeout' => 5,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Generation Defaults
    |--------------------------------------------------------------------------
    |
    | Default values used when the admin does not provide explicit options.
    |
    */

    'defaults' => [
        'language' => env('AI_WRITER_LANGUAGE', 'en'),
        'tone' => env('AI_WRITER_TONE', 'professional'),
        'word_count' => (int) env('AI_WRITER_WORD_COUNT', 800),
        'max_word_count' => (int) env('AI_WRITER_MAX_WORD_COUNT', 4000),
    ],

];

