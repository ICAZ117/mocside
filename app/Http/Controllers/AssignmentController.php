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
        if (Auth::user()->isProf()) {
            $validData = $request->validate([
                'name' => 'required',
                'description' => 'required',
                'lab_id' => 'required|int',
            ]);
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
        if (Auth::user()->isProf()) {
            return new AssignmentResource(Assignment::find($id));
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
        if (Auth::user()->isProf()) {
            $ass = Assignment::find($id);
            $ass->update($request->all());
            return response()->json(['data', $ass], 200);
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
        if (Auth::user()->isProf()) {
            $affectedAssignments = Assignment::destroy($id);
            return response()->json(["message" => "Delete successful."]);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}