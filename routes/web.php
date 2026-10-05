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



Route::middleware(['auth'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('admin.dashboard');

    Route::prefix('albumy')->name('admin.albums.')->group(function () {
        Route::get('/', [AlbumController::class, 'index'])->name('index');
        Route::get('/dodaj', [AlbumController::class, 'create'])->name('create');
        Route::post('/', [AlbumController::class, 'store'])->name('store');
        Route::get('/{id}/edytuj', [AlbumController::class, 'edit'])->name('edit');
        Route::put('/{id}', [AlbumController::class, 'update'])->name('update');
        Route::delete('/{id}', [AlbumController::class, 'delete'])->name('delete');
    });

    Route::delete('/zdjecia/{id}', [AlbumController::class, 'deletePhoto'])->name('admin.photos.delete');

    Route::prefix('aktualnosci')->name('admin.posts.')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('index');
        Route::get('/dodaj', [PostController::class, 'create'])->name('create');
        Route::post('/', [PostController::class, 'store'])->name('store');
        Route::get('/{id}/edytuj', [PostController::class, 'edit'])->name('edit');
        Route::put('/{id}', [PostController::class, 'update'])->name('update');
        Route::delete('/{id}', [PostController::class, 'delete'])->name('delete');
    });
});
require __DIR__.'/settings.php';
