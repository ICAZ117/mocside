<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    use HasFactory;

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'name',
        'description',
        'due_date',
        'course_id',
        'publish_date',
    ];
}
