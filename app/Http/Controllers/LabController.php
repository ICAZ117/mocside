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

    public function showCourse($course_id)
    {
        $labs = Course::find($course_id)->labs;
        $labsRes = LabResource::collection($labs);
        return $labsRes;
    }

    public function store(Request $request)
    {
        if (Auth::user()->isAdmin()) {
            $validData = $request->validate([
                'name' => 'required',
                'description' => 'required',
                'course_id' => 'required|int',
                'due_date' => 'required',
            ]);
            return new LabResource(Lab::create($validData));
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function show($id)
    {
        return new LabResource(Lab::find($id));
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->isAdmin()) {
            $lab = Lab::find($id);
            $lab->update($request->all());
            return $lab;
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function destroy($id)
    {
        if (Auth::user()->isAdmin()) {
            return Lab::destroy($id);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}
