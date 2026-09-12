<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Announcement;
use App\Models\Intention;
use App\Models\Post;
use App\Models\Album;
use App\Models\Photo;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call
        ([
            AnnouncementSeeder::class,
            IntentionSeeder::class,
            PostSeeder::class, 
        ]);

        $album = Album::create([
            'title' => "wydarzenie testowe",
            'event_date' => "2026-05-05",
            'cover_image' => 'https://placehold.co/600x400/e7e5e4/a8a29e?text=Okladka+Albumu'
        ]);

        $photos = [
            'https://placehold.co/800x600/e7e5e4/a8a29e?text=Foto+1',
            'https://placehold.co/800x600/e7e5e4/a8a29e?text=Foto+2',
            'https://placehold.co/600x800/e7e5e4/a8a29e?text=Pionowe+3',
        ];

        foreach ($photos as $index => $url){
            Photo::create([
                'album_id' => $album->id,
                'image_path' => $url,
                'sort_order' => $index,
            ]);
        }
    
        User::factory()->create
        ([
        'name' => 'Admin',
        'email' => 'admin@parafia.pl',
        'password' => bcrypt('Haslo123!'),
        ]);

        Announcement::create
        ([
        'title' => 'Ogłoszenia - XXV niedziela zwykła',
        'content' => '<p>Przeżywaliśmy ostatnio 700 lat parafii...',
        'is_published' => true,
        ]);

        Intention::create
        ([
        'intention' => 'Za parafian i ich rodziny',
        'Masstime' => '10:00',
        'Massdate' => Carbon::now()->toDateString(),
        'location' => 'Olbierzowice',
        ]);

        Post::create
        ([
        'title' => 'Odpust parafialny',
        'content' => '<p>Dnia 10 sierpnia 2026 miały miejsce uroczystości odpustowe ku czci Św.Wawrzyńca.../>',
        'is_published' =>true
        ]);

    
    }
}

