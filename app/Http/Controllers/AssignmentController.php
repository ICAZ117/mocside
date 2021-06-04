<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Assignment;
use App\Models\Lab;
use App\Http\Resources\AssignmentResource;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->isAdmin()) {
            return Assignment::all();
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::user()->isAdmin()) {
            $validData = $request->validate([
                'id' => 'required',
                'name' => 'required',
                'description' => 'required',
                'lab_id' => 'required',
            ]);
            return Assignment::create($validData);
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
        if (Auth::user()->isProf()) {
            return new AssignmentResource(Assignment::find($id));
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function showRes($id)
    {
        $listOfAssignments = Lab::find($id)->assignments;
        $assignmentRes = AssignmentResource::collection($listOfAssignments);
        // $assignment = Assignment::find($id);
        // // I can abstract in here by creating a resource (like User Res.)
        // // And choose what I want in the return array, including things
        // // from the eloquent relationships.
        // $assignmentRes = new AssignmentResource($assignment); 
        return $assignmentRes;
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
        if (Auth::user()->isAdmin()) {
            $ass = Assignment::find($id);
            $ass->update($request->all());
            return $ass;
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
        if (Auth::user()->isAdmin()) {
            return Assignment::destroy($id);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}