<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * This level of abstraction is what adds the nasty '.data.data',
     * but I like the level of control it gives you over what you
     * return from this object's unique relationships,
     * while hiding things you don't want seen in a response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $labs = $this->labs;
        $problems = [];
        $total = 0;
        for ($i = 0; $i < count($labs); $i++) {
            array_push($problems, $labs[$i]->assignments);
        }

        for ($j = 0; $j < count($problems); $j++) {
            for ($k = 0; $k < count($problems[$j]); $k++) {
                $points = $problems[$j][$k]->test_cases->count();
                $total = $total + $points;
            }
        }

        return [
            'id' => $this->id,
            'roster' => $this->roster,
            'name' => $this->name,
            'description' => $this->description,
            'img_loc' => $this->img_loc,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'owner_id' => $this->owner_id,
            'num_labs' => $this->labs->count(),
            'total_points' => 0,
        ];
    }
}