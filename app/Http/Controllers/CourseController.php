<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return course::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // I only want admins to be able to create a course
        if (Auth::user()->isAdmin()) {
            $validData = $request->validate([
                'id' => 'required|int',
                'roster' => 'required',
                'name' => 'required',
                'description' => 'required',
            ]);
            return course::create($validData);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return course::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Only admins update courses
        if (Auth::user()->isAdmin()) {
            $cou = course::find($id);
            $cou->update($request->all());
            return $cou;
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // I want to restrict course deletion to admins
        if (Auth::user()->isAdmin()) {
            return course::destroy($id);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}
