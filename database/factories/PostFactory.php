<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->realText(60),
            'content' => fake()->realText(800),
            'image_path' => 'https://picsum.photos/seed/' . fake()->uuid(). '/800/400',
            'is_published' => true,
            'created_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }
}
