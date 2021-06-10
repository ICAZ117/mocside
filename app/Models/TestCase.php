<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestCase extends Model
{
    use HasFactory;
    protected $table = 'test_cases';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'assignment_id',
        'input',
        'output',
        'points',
    ];

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }
}