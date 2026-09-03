<?php
use App\Models\Announcement;
use App\Models\Intention;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('glowna');


Route::get('/ogloszenia', function () {
    return Inertia::render('Announcements');
})->name('ogloszenia');

Route::get('/ogloszenia/olbierzowice', function(){
    $ogloszenia = Announcement::where('location', 'Olbierzowice')->where('location','olbierzowice')->latest()->paginate(5);
    return Inertia::render('AnnouncementsShow', ['announcements' => $ogloszenia,
    'title' => 'Ogłoszenia - Olbierzowice']);
})->name('ogloszenia.olbierzowice');

Route::get('/ogloszenia/nawodzice', function(){
    $ogloszenia = Announcement::where('location', 'Nawodzice')->where('location','olbierzowice')->latest()->paginate(5);
    return Inertia::render('AnnouncementsShow', ['announcements' => $ogloszenia,
    'title' => 'Ogłoszenia - Nawodzice']);
})->name('ogloszenia.nawodzice');

Route::get('/katechezy', function(){
    $katechezy = \App\Models\Announcement::where('type', 'katecheza')->latest()->paginate(5);
    return \Inertia\Inertia::render('AnnouncementsShow',['announcements' => $katechezy,
    'title' => 'Katechezy Parafialne']);
}) ->name('katechezy');



Route::get('/intencje',function(){
    $intentions = Intention::orderBy('Massdate')->orderBy('Masstime')->get();
    return Inertia::render('Intentions', ['intentions' => $intentions]);
}) -> name('intencje');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
