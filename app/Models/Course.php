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
    ];

    // not sure if this will be helpful, leaving commented.
    // protected $casts = [
    //     'published' => 'boolean',
    // ];

    public function owner()
    {
        return $this->hasOne(Professor::class, 'owner_id', 'fsc_id');
    }

    public function labs()
    {
        return $this->hasMany(Lab::class);
    }
}