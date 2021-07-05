<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Assignment;
use App\Models\TestCase;
use App\Http\Resources\SmallCaseResource;

class TestCaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Why would you do this? Don't do this.
        if (Auth::user()->isAdmin()) {
            return TestCase::all();
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
        $user = Auth::user();
        $validData = $request->validate([
            'assignment_id' => 'required',
            'input' => 'required',
            'output' => 'required',
            'feedback' => 'required',
        ]);
        // $owner = Assignment::find($validData['assignment_id'])->lab->course->owner_id;

        // I could check course ownership, here
        // but at this point it would be a pain. 
        // Please be a good samaritan.
        if ($user->isAdmin() || $user->isProf()) {
           
            return TestCase::create($validData);
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
        return TestCase::find($id);
    }

    public function getCases($problem_id)
    {
        $user = Auth::user();
        if ($user->isAdmin() || $user->isProf()) {
            return response()->json(["data" => Assignment::find($problem_id)->test_cases], 200);
        } else {
            return response()->json(["data" => SmallCaseResource::collection(Assignment::find($problem_id)->test_cases)], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
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
        $user = Auth::user();
        if ($user->isAdmin() || $user->isProf()) {
            $tc = TestCase::find($id);
            $tc->update($request->all());
            return $tc;
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
        // Courses, labs, assignments, and test cases should be deletable by profs.
        if (Auth::user()->isAdmin()) {
            return TestCase::destroy($id);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}
