<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentResource extends JsonResource
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
          'python_starter' => $this->python_starter,
          'java_starter' => $this->java_starter,
          'due_date' => $this->due_date,
          'due_date_utc' => $this->due_date_utc,
          'isPublished' => $this->isPublished(),
          'lab_id' => $this->lab_id,
          // 'course_id' => $this->lab->course_id,
          'test_cases' => $this->test_cases->count(),
          'worth' => $this->worth(),
        ];
    }
}