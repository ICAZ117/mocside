<?php

namespace App\Http\Controllers;

use App\Http\Resources\LabResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Course;
use App\Models\Lab;

class LabController extends Controller
{
    // This route is unhelpful
    public function index()
    {
        if (Auth::user()->isAdmin()) {
            return Lab::all();
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    // this shows a resource listing of all labs in a course.
    public function showCourse($course_id)
    {
        $labs = Course::find($course_id)->labs;
        $labsRes = LabResource::collection($labs);
        return $labsRes;
    }

    public function store(Request $request)
    {
        // prof check for lab creation
        $user = Auth::user();

        // admin bypass
        if ($user->isAdmin())
        {
            $validData = $request->validate([
                'name' => 'required',
                'description' => 'required',
                'course_id' => 'required|int',
                'due_date' => 'required',
            ]);
            return new LabResource(Lab::create($validData));
        }

        if ($user->isProf()) {
            $validData = $request->validate([
                'name' => 'required',
                'description' => 'required',
                'course_id' => 'required|int',
                'due_date' => 'required',
            ]);
            // check to make sure prof owns course
            $course = Course::find($validData['course_id']);
            $owner = $course->owner;
            if ($user->fsc_id == $owner->fsc_id) {
                return new LabResource(Lab::create($validData));
            }
            return response()->json(['message' => 'Action failed: this is not your course.'], 403);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function show($id)
    {
        return new LabResource(Lab::find($id));
    }

    public function update(Request $request, $id)
    {
        $lab = Lab::find($id);
        $owner = $lab->course->owner;
        $user = Auth::user();

        // admin bypass
        if ($user->isAdmin()) {
            $lab->update($request->all());
            $rsc = new LabResource($lab);
            return response()->json(['message' => 'Update successful', "data" => $rsc], 200);
        }

        // prof check for lab update
        if ($user->isProf() && $owner->fsc_id == $user->fsc_id) {
            $lab->update($request->all());
            $rsc = new LabResource($lab);
            return response()->json(['message' => 'Update successful', "data" => $rsc], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function destroy($id)
    {
        if (Auth::user()->isAdmin()) {
            $lab = Lab::destroy($id);
            return response()->json(['message' => "Delete sucessful", "data" => $lab], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}
