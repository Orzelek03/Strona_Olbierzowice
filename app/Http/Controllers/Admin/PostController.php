<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->paginate(10);

        return Inertia::render('admin/Posts/Index', ['posts' => $posts]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
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
