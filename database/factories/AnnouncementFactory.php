<?php

namespace Database\Factories;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Factories\Factory;
use database\factories\AnnouncementFactory;

/**
 * @extends Factory<Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->realText(40),
            'content' => fake()->realText(400),
            'is_published' => true,
            'created_at' => fake()->dateTimeBetween('-2 months', 'now'),
            'type' => fake()->randomElement(['ogloszenie', 'katecheza']),
            'location' => fake()->randomElement(['Olbierzowice', 'Nawodzice']),
        ];
    }
}
