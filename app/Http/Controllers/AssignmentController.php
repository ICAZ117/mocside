<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Assignment;
use App\Models\Lab;
use App\Http\Resources\AssignmentResource;
use App\Http\Resources\FullAssignmentResource;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     * This should be a debugging exclusive,
     * if the route is registered at all.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // This check is remaining isAdmin because of the scope.
        if (Auth::user()->isAdmin()) {
            return Assignment::all();
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Store a newly created resource in storage,
     * and returns it as it's properly formatted
     * JSON resource as defined elsewhere.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'due_date' => 'required',
            'lab_id' => 'required|int',
        ]);
        $lab = Lab::find($validData['lab_id']);
        $owner = $lab->course->owner_id;

        if ($user->isAdmin())
        {
            $assignment =  Assignment::create($validData);
            return new AssignmentResource($assignment);
        }

        if ($user->isProf() && $user->fsc_id == $owner) 
        {
            return new AssignmentResource(Assignment::create($validData));
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
        // this resource contains the gradbook.
        $user = Auth::user();
        $assignment = Assignment::find($id);
        // as such I am protecting it behind course ownership.
        $owner = $assignment->lab->course->owner_id;  // with an admin bypass, of course.
        if ( ($user->isProf() && $user->fsc_id == $owner) || $user->isAdmin()) {
            return new FullAssignmentResource($assignment);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }


    // shows listing of assignments by LAB ID and then returns
    // a collection of JSON resources.
    public function showRes($id)
    {
        $listOfAssignments = Lab::find($id)->assignments;
        $assignmentRes = AssignmentResource::collection($listOfAssignments);
        return $assignmentRes;
    }

    /**
     * Update the specified resource in storage.
     * Will return updated resource in a .data.data
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $owner = $assignment->lab->course->owner_id;

        if ($user->isAdmin()) {
            $assignment->update($request->all());
            return response()->json(["message" => "Update successful."], 200);
        }

        if ($user->isProf() && $user->fsc_id == $owner)
        {
            $assignment->update($request->all());
            return response()->json(["message" => "Update successful."], 200);
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
        $user = Auth::user();
        if ($user->isProf() || $user->isAdmin()) {
            $affectedAssignments = Assignment::destroy($id);
            return response()->json(["message" => "Delete successful.", "data" => $affectedAssignments], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}