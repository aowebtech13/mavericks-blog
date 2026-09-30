<?php

use App\Services\Media\MediaService;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('media')) {
            return;
        }

        app(MediaService::class)->sync();
    }

    public function down(): void
    {
        // Registered media rows are legitimate library data — keep them.
    }
};
