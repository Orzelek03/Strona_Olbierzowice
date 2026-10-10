<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Photo;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index(){
        return Inertia::render('admin/Albums/Index', ['albums' => Album::withCount('photos')->latest()->paginate(10)]);
    }

    public function create(){
        return Inertia::render('admin/Albums/Create');
    }

    public function edit($id){
        $album = Album::with('photos')->findOrFail($id);
        return Inertia::render('admin/Albums/Edit', ['album' => $album]);
    }

    public function update(Request $request, $id){
        $album = Album::findOrFail($id);
        $request->validate([
            'title' => 'required|string|max:255',
            'event_date' => 'required|date',
            'cover_image' => 'nullable|image|max:5120',
            'photos.*' => 'image|max:5120',
        ]);
        $album->title = $request->title;
        $album->event_date = $request->event_date;
        
        if($request->hasFile('cover_image')){
            if($album->cover_image){
                $oldCoverPath = str_replace('/storage/', '', $album->cover_image);
                Storage::disk('public')->delete($oldCoverPath);
            }
            $path = $request->file('cover_image')->store('albums/covers','public');
            $album->cover_image = '/storage/' . $path;
        }

        if($request->hasFile('cover_image')){
            if($album->cover_image){
                Storage::disk('public')->delete(str_replace('/storage/', '', $album->cover_image));
            }
            $path = $request->file('cover_image')->store('albums/covers','public');
            $album->cover_image = '/storage/' . $path;
        }

        $album->title = $request->title;
        $album->event_date = $request->event_date;
        $album->save();

        if($request->hasFile('photos')){
            foreach($request->file('photos') as $index=> $photoFile){
                $photoPath = '/storage/'.$photoFile->store('albums/' . $album->id . '/photos', 'public');
                Photo::create([
                    'album_id' => $album ->id,
                    'image_path'=> $photoPath,
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.albums.index')->with('success','Album został pomyślnie zaktualizowany.');
    }

    public function store (Request $request){
    $request->validate([
        'title' => 'required|string|max:255',
        'event_date' => 'required|date',
        'cover_image' => 'nullable|image|max:5120',
        'photos.*' => 'image|max:5120',
    ]);

    // 1. Najpierw tworzymy album (na razie bez okładki), aby baza wygenerowała mu unikalne ID
    $album = Album::create([
        'title' => $request->title,
        'event_date' => $request->event_date,
        'cover_image' => null, 
    ]);

    // 2. Skoro mamy już ID (np. 15), zapisujemy okładkę w folderze albums/15
    if($request->hasFile('cover_image')){
        $path = $request->file('cover_image')->store('albums/' . $album->id, 'public');
        
        // Aktualizujemy wpis w bazie o gotową ścieżkę
        $album->update(['cover_image' => '/storage/' . $path]);
    }

    // 3. Zapisujemy pozostałe zdjęcia do podfolderu np. albums/15/photos
    if($request->hasFile('photos')){
        foreach($request->file('photos') as $index => $photoFile){
            // Magia dzieje się tutaj - dodajemy ID do ścieżki zapisu:
            $photoPath = '/storage/'. $photoFile->store('albums/' . $album->id . '/photos', 'public');
            
            Photo::create([
                'album_id' => $album->id,
                'image_path'=> $photoPath,
                'sort_order' => $index,
            ]);
        }
    }

    return redirect()->route('admin.albums.index')->with('success','Album został pomyślnie utworzony.');
}

    public function delete($id){
        $album = Album::findOrFail($id);
            if($album -> cover_image && !str_starts_with($album->cover_image, 'http')){
                $coverPath = str_replace('/storage/', '', $album->cover_image);
                Storage::disk('public')->delete($coverPath);
            }
            if($album->photos){
                foreach($album->photos as $photo){
                    if ($photo-> image_path && !str_starts_with($photo->image_path, 'http')){
                        $photoPath = str_replace('/storage/', '', $photo->image_path);
                        Storage::disk('public')->delete($photoPath);
                    }
                }
            }
        $album -> photos()->delete();
        $album->delete();
        
        return redirect()->route('admin.albums.index')->with('success','Album został pomyślnie usunięty');
    }

    public function deletePhoto($id){
        $photo = Photo::findOrFail($id);
        if($photo->image_path){
            Storage::disk('public')->delete(str_replace('/storage/', '', $photo->image_path));
        }
        $photo->delete();
        return redirect()->back()->with('success','Zdjęcie zostało pomyślnie usunięte.');
    }   


}
