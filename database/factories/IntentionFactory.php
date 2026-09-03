<?php

namespace Database\Factories;

use App\Models\Intention;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Intention>
 */
class IntentionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Massdate' => fake()->dateTimeBetween('now', '+1 month')->format('m-d'),
            'Masstime' => fake()->randomElement(['08:00', '10:00', '12:00', '14:00', '16:00']),
            'intention' => 'Za zmarłych ' . fake()->name(),
            'location' => fake()->randomElement(['Olbierzowice', 'Nawodzice']),
        ];
    }
}
