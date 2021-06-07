<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    public function getKey(): string
    {
        return static::class;
    }

    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    public function isProf(): bool
    {
        $fscRole = $this->fsc_role;
        if ($fscRole == 'professor')
        {
            return true;
        }
        return false;
    }

    public function fscUser()
    {
        if ($this->isProf())
        {
            return $this->hasOne(Professor::class, 'fsc_id', 'fsc_id');
        }
        return $this->hasOne(Student::class, 'fsc_id', 'fsc_id');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'fsc_id',
        'fsc_role',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];
}
