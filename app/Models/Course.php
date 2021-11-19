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
        'img_loc',
        'start_date',
        'end_date',
        'owner_id',
        'gradebook',
    ];

    // not sure if this will be helpful, leaving commented.
    // protected $casts = [
    //     'published' => 'boolean',
    // ];

    public function owner()
    {
        return $this->belongsTo(Professor::class, 'owner_id', 'fsc_id');
    }

    public function labs()
    {
        return $this->hasMany(Lab::class);
    }

    public function worth()
    {
        $labs = $this->labs;
        $problems = [];
        $total = 0;
        for ($i = 0; $i < count($labs); $i++) {
            array_push($problems, $labs[$i]->assignments);
        }

        for ($j = 0; $j < count($problems); $j++) {
            for ($k = 0; $k < count($problems[$j]); $k++) {
                $points = $problems[$j][$k]->test_cases->count();
                $total = $total + $points;
            }
        }
        return $total;
    }

    public function invites()
    {
        return $this->hasMany(InviteCode::class, 'course_id', 'id');
    }

}