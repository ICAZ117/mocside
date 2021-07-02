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
        'gradebook_courses',
        'gradebook_labs',
        'gradebook_problems',
    ];

    public function progress()
    {
        return $this->hasOne(Progress::class, 'fsc_id', 'fsc_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'fsc_id', 'fsc_id');
    }

    public function inCourse($id): bool
    {
        // determines if user is in course
        $courses = $this->courses;
        foreach ($courses as $course) {
            if ($course == $id) {
                return true;
            }
        }
        return false;
    }
}