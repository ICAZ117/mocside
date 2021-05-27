<?php

namespace App\Http\Controllers;

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
        return $labs;
    }

    public function store(Request $request)
    {
        if (Auth::user()->isAdmin()) {
            $validData = $request->validate([
                'id' => 'required|int',
                'name' => 'required',
                'description' => 'required',
                'course_id' => 'required|int',
            ]);
            return Lab::create($validData);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function show($id)
    {
        return Lab::find($id);
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
