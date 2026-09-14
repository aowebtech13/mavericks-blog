<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_generations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('provider');
            $table->string('model');
            $table->string('topic')->nullable();
            $table->longText('prompt');
            $table->longText('response')->nullable();
            $table->enum('status', ['pending', 'success', 'failed'])->default('pending');
            $table->text('error')->nullable();
            $table->foreignId('post_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();

            $table->index('status');
            $table->index('provider');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_generations');
    }
};

