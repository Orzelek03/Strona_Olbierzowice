<?php
use App\Http\Controllers\Admin\AlbumController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\IntentionController;
use App\Http\Controllers\Admin\PostController;
use App\Models\Announcement;
use App\Models\Intention;
use App\Models\Post;
use App\Models\Album;
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
    $albums = Album::orderBy('event_date', 'desc') ->paginate(9);
    return Inertia::render('Gallery', [
        'albums' => $albums
    ]);
}) -> name('galeria.index');

Route::get('/galeria/{id}', function($id){
    $album = Album::with('photos')->findOrFail($id);
    return Inertia::render('Album', ['album' => $album]);
}) -> name ('galeria.album');



Route::get('/intencje',function(){
    $intentions = Intention::orderBy('Massdate')->orderBy('Masstime')->get();
    return Inertia::render('Intentions', ['intentions' => $intentions]);
}) -> name('intencje');



Route::middleware(['auth',])->prefix('admin')->group(function () {
    Route::get('/dashboard', function(){
    return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/albumy/dodaj', [AlbumController::class, 'create'])->name('admin.albums.create');
    Route::post('/albumy', [AlbumController::class, 'store'])-> name('admin.albums.store');
    Route::get('/albumy/{id}/edytuj', [AlbumController::class, 'edit'])->name('admin.albums.edit');
    Route::put('albumy/{id}', [AlbumController::class, 'update'])->name('admin.album.update');
    Route::delete('/albumy/{id}', [AlbumController::class, 'delete'])->name('admin.album.delete');
    
    Route::get('/aktualnosci/dodaj', [PostsController::class, 'create'])->name('admin.posts.create');
    Route::post('/aktualnosci', [PostController::class, 'store'])-> name('admin.posts.store');

    Route::get('/intencje/dodaj', [IntentionController::class, 'create'])->name('admin.intentions.create');
    Route::post('/intencje', [IntetnionController::class, 'store'])-> name('admin.intentions.store');

    Route::get('/ogloszenia/dodaj', [AnnouncementController::class, 'create'])->name('admin.announcements.create');
    Route::post('/ogloszenia', [AnnouncementController::class, 'store'])-> name('admin.announcements.store');
});

require __DIR__.'/settings.php';
