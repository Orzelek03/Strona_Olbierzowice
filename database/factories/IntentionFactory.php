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
            'intention' => 'Za zmarłych ' . fake()->name(),
            'Masstime' => '10:00',
            'Massdate' => '2026-09-03',
            'location' => fake()->randomElement(['Olbierzowice', 'Nawodzice']),
        ];
    }
}
