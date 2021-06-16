<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'code';
    protected $fillable = [
        'id',
        'fsc_id',
        'assignment_id',
        'lang',
        'code',
    ];

    public function assignment()
    {
        return $this->belongsTo(Assignment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'fsc_id', 'fsc_id');
    }
}