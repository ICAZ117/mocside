<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'fsc_id',
        'screen_name',
        'pronouns',
        'courses',
    ];

    // public function progress()
    // {
    //     return $this->hasOne(Progress::class);
    // }
}