<?php

namespace App\Jobs;

use App\Services\Ai\BlogGeneratorService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Throwable;

class GenerateBlogJob implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 300;
    public int $tries = 1;

    /**
     * Create a new job instance.
     *
     * @param  array<string, mixed>  $input
     */
    public function __construct(public array $input)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(BlogGeneratorService $service): void
    {
        $service->generate($this->input);
    }

    /**
     * Handle a job failure.
     */
    public function failed(?Throwable $e): void
    {
        // The BlogGeneratorService already persists a "failed" AiGeneration record
        // when generation throws. Here we simply log for visibility.
        report($e);
    }
}

