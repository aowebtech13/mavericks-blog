<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'primusmediacity@gmail.com'],
            [
                'name' => 'Primus Media Admin',
                'password' => bcrypt('passwordPrimusmedia@1'),
                'is_admin' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'is_admin' => false,
                'password' => bcrypt('password'),
            ]
        );

        $this->call([
            BlogSeeder::class,
        ]);
    }
}
