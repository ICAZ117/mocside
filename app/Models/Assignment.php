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
        'name',
        'description',
        'python_starter',
        'python_model',
        'java_starter',
        'java_model',
        'test_cases',
        'due_date',
        'lab_id',
        'gradebook',
    ];

    public function lab() 
    {
        return $this->belongsTo(Lab::class);
    }

    public function test_cases()
    {
        return $this->hasMany(TestCase::class);
    }
}