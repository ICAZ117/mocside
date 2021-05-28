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
        'sample',
        'test_cases',
        'due_date',
        'lab_id'
    ];

    public function lab() 
    {
        return $this->belongsTo(Lab::class);
    }

    // public function test_cases()
    // {
    //     return $this->hasMany(TestCase::class);
    // }
}