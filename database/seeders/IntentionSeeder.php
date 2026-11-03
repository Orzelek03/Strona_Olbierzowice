<?php

namespace Database\Seeders;

use App\Models\Intention;
use Illuminate\Database\Seeder;

class IntentionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Intention::factory(15)->create();
    }
}
