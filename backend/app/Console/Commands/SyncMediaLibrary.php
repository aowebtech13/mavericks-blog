<?php

namespace App\Console\Commands;

use App\Services\Media\MediaService;
use Illuminate\Console\Command;

class SyncMediaLibrary extends Command
{
    protected $signature = 'media:sync
        {--prune : Delete media rows whose file is missing from disk}
        {--fresh : Ignore the sync throttle and always run a full scan}';

    protected $description = 'Register pre-existing files from storage into the media library';

    public function handle(MediaService $mediaService): int
    {
        if ($this->option('fresh')) {
            cache()->forget(MediaService::SYNC_CACHE_KEY);
        }

        $result = $mediaService->sync((bool) $this->option('prune'));

        $this->newLine();
        $this->info(sprintf(
            'Media sync complete: %d registered, %d refreshed, %d removed.',
            $result['registered'],
            $result['refreshed'],
            $result['removed'],
        ));

        if ($result['registered'] > 0) {
            $this->line('Previously uploaded files are now visible in the media library.');
        }

        return self::SUCCESS;
    }
}
