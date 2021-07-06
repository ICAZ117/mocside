<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InviteCode extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'join_key',
        'course_id',
        'expire_date',
        'uses',
        'max_uses',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}