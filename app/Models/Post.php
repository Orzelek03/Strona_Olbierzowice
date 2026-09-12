<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;
    protected $fillable =['title','content','image_path','is_published','album_id'];

    public function album()
    {
        return $this -> belongsTo(Album::class);
    }
}
