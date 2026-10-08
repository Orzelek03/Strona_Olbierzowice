<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Photo;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('album.photos')->latest()->paginate(10);

        return Inertia::render('admin/Posts/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('admin/Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
            'photos.*' => 'nullable|image|max:5120',
            'is_published' => 'boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts/images', 'public');
            $imagePath = '/storage/'.$path;
        }

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_path' => $imagePath,
            'is_published' => $request->boolean('is_published'),
            'album_id' => null,
        ]);

        if ($request->hasFile('photos')) {
             $album = Album::create([
                'title' => $request->title,
                'event_date' => now()->toDateString(),
                'cover_image' => $imagePath,
            ]);
                foreach ($request->file('photos') as $index => $photoFile) {
            $photoPath = '/storage/'.$photoFile->store('albums/photos', 'public');
            Photo::create([
                'album_id' => $album->id,
                'image_path' => $photoPath,
                'sort_order' => $index,
            ]);
           }
            $post->update(['album_id' => $album->id]);
        
           
        }

        

        return redirect()->route('admin.posts.index')->with('success', 'Post został dodany pomyślnie.');
    }

    public function edit($id){
        $post = Post::with('album')->findOrFail($id);
        return Inertia::render('admin/Posts/Edit', ['post' => $post]);
    }

    public function update(Request $request, $id){
            
        $post = Post::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
            'photos.*' => 'nullable|image|max:5120',
            'is_published' => 'boolean',
        ]);

        if($request->hasFile('image')){
            if($post->image_path && !str_replace_with($post->image_path, 'http')){
                Storage::disk('public') -> delete(str_replace('/storage/', '', $post->image_path));
            }
            $path =$request->file('image')->store('posts/images','public');
            $post->image_path ='/storage/' . $path;
        }

        $post->title = $request->title;
        $post->content = $request -> content;
        $post->is_published=$request->boolean('is_published');
        $post->save();

        if($request->hasFile('photos')){
            if(!$post -> album_id){
                $album = Album::create([
                    'title' => $post->title,
                    'event_date' => now()->toDateString(),
                    'cover_image' => $post->image_path,
                ]);
                $post->update(['album_id'=> $album->id]);
            } else{
                $album = Album::find($post->album_id);
            }
            $startingOrder = $album->photos()->max('sort_order') !== null
            ? $album->photos()->max('sort_order')+1
            : 0;
            foreach($request->file('photos')as $index => $photoFile){
                $photoPath = '/storage/' . $photoFile->store('albums/photos','public');
                Photo::create([
                    'album_id' => $album->id,
                    'image_path' => $photoPath,
                    'sort_order' => $startingOrder + $index,
                ]);
            }
        }
        return redirect()->route('admin.posts.index')->with('success', 'Post został pomyślnie zaktualizowany.');
    }

    public function delete($id)
    {
        $post = Post::findorFail($id);
        if ($post->image_path && ! str_starts_with($post->image_path, 'http')) {
            $imagePath = str_replace('/storage/', '', $post->image_path);
            Storage::disk('public')->delete($imagePath);
        }
        $post->delete();

        return redirect()->back()->with('success', 'Post został usunięty pomyślnie.');
    }
}
