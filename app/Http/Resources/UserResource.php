<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'name' => $this->name,
          'email' => $this->email,
          'isAdmin' => $this->isAdmin(),
          'isProfessor' => $this->isProf(),
          'isVerified' => $this->isVerified(),
          'fsc_user' => $this->fscUser,
          'username' => $this->username,
          'settings' => json_decode($this->settings, true),
          'pfp_path' => $this->pfp_path
        ];
    }
}