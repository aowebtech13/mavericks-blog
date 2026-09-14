<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->boolean('ai_generated')->default(false)->after('views_count');
            $table->json('ai_generation_data')->nullable()->after('ai_generated');
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['ai_generated', 'ai_generation_data']);
        });
    }
};

