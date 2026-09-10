<?php
use App\Models\Announcement;
use App\Models\Intention;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $aktualnosci = Post::where('is_published', true) ->latest() ->paginate(4);

    {/*$slowo = Cache::remember('slowo_dzisiejsze', now()->addHours(12), function () {
    try{
    $response = Http::withoutVeryfing()->timeout(3)->get('https://brewiarz.pl/rss/czyt.xml');
    if ($response -> successful()){
        $xml = simplexml_load_string($response->body());
        $tytul = (string) $xml -> channel -> item[0] -> title;
        $fragment = explode(' - ', $tytul);
        return isset($fragment[1]) ? "Czytania: " . $fragment[1] : $tytul;
    } 
    } catch (\exception $e){

    }
    return 'Sprawdź czytania w Niezbędniku niedzielnym';
    });
    */}
    return Inertia::render ('Welcome', ['posts' => $aktualnosci]);
})->name('glowna');

Route::get('/aktualnosci/{id}', function ($id){
    $post = Post::findOrFail($id);
    return Inertia::render('PostShow', ['post'=> $post]);
})-> name('post.show');


Route::get('/ogloszenia', function () {
    return Inertia::render('Announcements');
})->name('ogloszenia');

Route::get('/ogloszenia/olbierzowice', function(){
    $ogloszenia = Announcement::where('location', 'Olbierzowice')->where('location','Olbierzowice')->latest()->paginate(5);
    return Inertia::render('AnnouncementsShow', ['announcements' => $ogloszenia,
    'title' => 'Ogłoszenia - Olbierzowice']);
})->name('ogloszenia.olbierzowice');

Route::get('/ogloszenia/nawodzice', function(){
    $ogloszenia = Announcement::where('location', 'Nawodzice')->where('location','Nawodzice')->latest()->paginate(5);
    return Inertia::render('AnnouncementsShow', ['announcements' => $ogloszenia,
    'title' => 'Ogłoszenia - Nawodzice']);
})->name('ogloszenia.nawodzice');

Route::get('/katechezy', function(){
    $katechezy = Announcement::where('type', 'katecheza')->latest()->paginate(5);
    return Inertia::render('AnnouncementsShow', [
        'announcements' => $katechezy,
        'title' => 'Katechezy Parafialne'
    ]);
})->name('katechezy');

Route::get('/historia', function(){
    return Inertia::render('History');
}) ->name('historia');

Route::get('/kontakt', function(){
    return Inertia::render('Contact');
}) ->name('kontakt');

Route::get('/galeria', function(){
    return Inertia::render('Gallery');
}) -> name('galeria');



Route::get('/intencje',function(){
    $intentions = Intention::orderBy('Massdate')->orderBy('Masstime')->get();
    return Inertia::render('Intentions', ['intentions' => $intentions]);
}) -> name('intencje');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
