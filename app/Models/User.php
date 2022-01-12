<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
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

    public function isActive(): bool
    {
        return $this->status;
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

    public function isVerified(): bool
    {
        if ($this->email_verified_at)
        {
            return true;
        } else {
            return false;
        }
    }

    public function fscUser()
    {
        if ($this->isProf())
        {
            return $this->hasOne(Professor::class, 'fsc_id', 'fsc_id');
        }
        return $this->hasOne(Student::class, 'fsc_id', 'fsc_id');
    }

    public function code_snaps()
    {
        return $this->hasMany(Code::class, 'fsc_id', 'fsc_id');
    }

    public function hasProgress($assignment_id, $lang): bool
    {
        $snaps = $this->code_snaps;
        foreach ($snaps as $snap) {
            if ($snap->assignment_id == $assignment_id && strcasecmp($snap->lang, $lang) == 0) {
                return true;
            }
        }
        return false;
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
        'pfp_path',
        'settings',
        'status'
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
        'status' => 'boolean'
    ];
}
