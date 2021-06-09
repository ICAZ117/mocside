<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FullAssignmentResource extends JsonResource
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
          'test_cases' => $this->test_cases->count(),
          'python_starter' => $this->python_starter,
          'java_starter' => $this->java_starter,
          'due_date' => $this->due_date,
          'lab_id' => $this->lab_id,
          'gradebook' => $this->gradebook,
        ];
    }
}