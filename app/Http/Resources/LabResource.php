<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LabResource extends JsonResource
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
          'description' => $this->description,
          'num_problems' => $this->assignments->count(),
          'due_date' => $this->due_date,
          'publish_date' => $this->publish_date,
          'total_points' => $this->worth(),
        ];
    }
}