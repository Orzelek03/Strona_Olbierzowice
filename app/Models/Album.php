<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'event_date', 'cover_image'];

    public function photos()
    {
    return $this -> hasMany(Photo::class) -> orderBy('sort_order', 'asc');
    }

    public function posts()
    {
    return $this -> hasMany(Post::class);
    }
 }