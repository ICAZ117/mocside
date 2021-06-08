<?php

namespace App\Http\Controllers;

use App\Models\Progress;
// use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function index(){
        // no
    }

    public function show($id)
    {
        $user = Auth::user();
        // $id is STUDENT->fsc_id
        if ($user->fsc_id == $id || $user->isAdmin())
        {
            return Progress::where('fsc_id', $id)->first();
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        // $id is STUDENT->fsc_id
        if ($user->fsc_id == $id || $user->isAdmin())
        {
            // updating progress
            $progress = Progress::where('fsc_id', $id)->first();
            $progress->update($request->all());
            return response()->json(['message' => 'Update successfull.', 'data' => $progress], 200);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function store()
    {
        $user = Auth::user();
        // $id is STUDENT->fsc_id
        if ($user->fsc_id == $id || $user->isAdmin())
        {
            return Progress::firstOrCreate(['fsc_id' => Auth::user()->fsc_id]);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function destroy($id)
    {
        // This will follow the "admin only delete" principle for now.
        if (Auth::user()->isAdmin())
        {
            $deletedProgress = Progress::where('fsc_id', $id)->delete();
            return response()->json(['message' => "Delete successfull.", "data" => $deletedProgress], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }
}