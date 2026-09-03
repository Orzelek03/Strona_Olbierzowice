<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Intention extends Model
{
    use HasFactory;

    protected $fillable = [
        'intention',
        'Masstime',
        'Massdate',
        'location',
    ];
}
