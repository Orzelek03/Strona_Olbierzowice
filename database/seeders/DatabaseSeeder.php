<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Announcement;
use App\Models\Intention;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AnnouncementSeeder::class,
            IntentionSeeder::class,
            
        ]);
    User::factory()->create([
        'name' => 'Admin',
        'email' => 'admin@parafia.pl',
        'password' => bcrypt('Haslo123!'),
    ]);
    Announcement::create([
        'title' => 'Ogłoszenia - XXV niedziela zwykła',
        'content' => '<p>Przeżywaliśmy ostatnio 700 lat parafii...',
        'is_published' => true,
    ]);

    Intention::create([
        'intention' => 'Za parafian i ich rodziny',
        'Masstime' => '10:00',
        'Massdate' => Carbon::now()->toDateString(),
    ]);
    }}

