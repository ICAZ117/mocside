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
          'python_starter' => $this->python_starter,
          'python_model' => $this->python_model,
          'java_starter' => $this->java_starter,
          'java_model' => $this->java_model,
          'due_date' => $this->due_date,
          'due_date_utc' => $this->due_date_utc,
          'isPublished' => $this->isPublished(),
          'lab_id' => $this->lab_id,
          'course_id' => $this->lab->course_id,
          'test_cases' => $this->test_cases->count(),
          'gradebook' => $this->gradebook,
          'worth' => $this->worth(),
        ];
    }
}