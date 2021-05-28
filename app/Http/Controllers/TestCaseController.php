<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Assignment;
use App\Models\TestCase;

class TestCaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        if (Auth::user()->isAdmin()) {
            $validData = $request->validate([
                'id' => 'required',
                'assignment_id' => 'required',
                'input' => 'required',
                'output' => 'required',
            ]);
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
        if (Auth::user()->isAdmin()) {
            return Assignment::find($problem_id)->test_cases;
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
        if (Auth::user()->isAdmin()) {
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
        if (Auth::user()->isAdmin()) {
            return TestCase::destroy($id);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}
