<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function index(){
        // no
    }

    public function show($id)
    {
        // $id is STUDENT->fsc_id
        if (Auth::user()->fsc_id == $id)
        {
            return Progress::where('fsc_id', $id)->first();
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function update(Request $request, $id)
    {
        // $id is STUDENT->fsc_id
        if (Auth::user()->fsc_id == $id)
        {
            // updating progress
            $progress = Progess::where('fsc_id', $id)->first();
            $progress->update($request->all());
            return response()->json(['data' => $progress]);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function store()
    {
        return Progress::firstOrCreate(['fsc_id' => Auth::user()->fsc_id]);
    }

    public function destroy($id)
    {
        if (Auth::user()->isAdmin())
        {
            $deletedProgress = Progress::where('fsc_id', $id)->delete();
            return response()->json(['message' => $deletedProgress], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }
}