<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        // these are nonspecific across copied instances.
        'description',
        'python_starter',
        'python_model',
        'java_starter',
        'java_model',
        'copy_id',
        // v-- these are specific across copied instances.
        'name',
        'due_date',
        'lab_id',
        'gradebook',
        'published',
        'due_date_utc',
        'lang',
    ];

    protected $casts = [
        'published' => 'boolean',
    ];

    public function lab() 
    {
        return $this->belongsTo(Lab::class);
    }

    public function test_cases()
    {
        return $this->hasMany(TestCase::class);
    }

    public function worth()
    {
        $test_cases = $this->test_cases;
        $total = 0;
        for ($i = 0; $i < count($test_cases); $i++) {
            $total = $total + $test_cases[$i]->points;
        }
        return $total;
    }

    public function isPublished() {
        return $this->published;
    }
}