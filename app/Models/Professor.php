<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
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

    public function ownedCourses()
    {
        return $this->hasMany(Course::class, 'fsc_id', 'owner_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'fsc_id', 'fsc_id');
    }
}