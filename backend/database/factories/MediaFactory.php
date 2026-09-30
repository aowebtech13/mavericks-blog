<?php

namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    protected $model = Media::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->word().'.jpg';

        return [
            'user_id' => null,
            'file_name' => $name,
            'path' => 'library/'.Str::random(40).'.jpg',
            'mime_type' => 'image/jpeg',
            'disk' => 'public',
            'size' => $this->faker->numberBetween(1024, 512000),
            'title' => ucfirst(pathinfo($name, PATHINFO_FILENAME)),
            'alt_text' => $this->faker->sentence(4),
            'folder' => 'library',
        ];
    }

    public function image(): static
    {
        return $this->state(fn () => ['mime_type' => 'image/jpeg']);
    }

    public function pdf(): static
    {
        return $this->state(fn () => [
            'file_name' => $this->faker->word().'.pdf',
            'path' => 'library/'.Str::random(40).'.pdf',
            'mime_type' => 'application/pdf',
        ]);
    }
}
