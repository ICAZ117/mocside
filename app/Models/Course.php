<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'roster',
        'name',
        'description',
    ];

    // not sure if this will be helpful, leaving commented.
    // protected $casts = [
    //     'published' => 'boolean',
    // ];
    
    // This is commented because I don't understand eloquest relationships :)
    // each course should be owned by a single user, who will have perm to delete/edit it.
    // public function owner() {
    //     return $this->belongsTo('user', 'user_id');
    // }
}