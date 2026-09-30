<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');

            // File metadata
            $table->string('file_name');                 // original name, e.g. sunset.jpg
            $table->string('path');                      // disk path, e.g. media/2026/09/ab12cd.jpg
            $table->string('mime_type');
            $table->string('disk')->default('public');
            $table->unsignedBigInteger('size')->default(0);

            // Presentation
            $table->string('title')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('folder')->nullable();        // logical grouping, e.g. "posts"

            $table->timestamps();

            $table->index('mime_type');
            $table->index('folder');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
