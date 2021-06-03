<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    use Hasfactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'fsc_id',
        'labs',
        'assignments',
        'progress',
    ];

    protected $hidden = [
        'id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'fsc_id', 'fsc_id');
    }
}