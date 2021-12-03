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
        $courses = json_decode($this->courses, true);
        foreach ($courses as $course) {
            if ($course == $id) {
                return true;
            }
        }
        return false;
    }

    public function courseArchived($course_id) {
        // moves course_id from courses to archived_courses
        $courses = json_decode($this->courses, true);
        // this check is here because legacy users (before 12/3/21) don't have an archived_courses field
        if($courses['archived']) {
            $courses['archived'] = array_merge($courses['archived'], [$course_id]);
        } else {
            $courses['archived'] = [$course_id];
        }
        // remove course_id from courses['courses']
        $courses['courses'] = array_diff($courses['courses'], [$course_id]);
        $this->courses = json_encode($courses);
        $this->save();
    }
}