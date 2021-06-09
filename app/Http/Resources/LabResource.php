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
        $assignments = $this->assignments;
        $total = 0;
        for ($i = 0; $i < count($assignments); $i++) {
          $points = $assignments[$i]->test_cases->count();
          $total = $total + $points;
        }

        return [
          'id' => $this->id,
          'name' => $this->name,
          'description' => $this->description,
          'num_problems' => $this->assignments->count(),
          'due_date' => $this->due_date,
          'publish_date' => $this->publish_date,
          'total_points' => $total,
        ];
    }
}