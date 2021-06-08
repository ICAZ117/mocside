<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Professor;

class ProfessorController extends Controller
{
    // List all profs. I'm leaving this in for a possible
    // 'Faculty' page.
    public function index()
    {
        return Professor::all();
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'fsc_id' => 'required|int',
        ]);

        if ($user->isAdmin())
        {
            $newProf = Professor::create($validData);
            return response()->json(["message" => 'Successfully created.', "data" => $newProf], 200);
        }

        if ($user->isProf() && $user->fsc_id == $validData['fsc_id'])
        {
            $newProf = Professor::create($validData);
            return response()->json(["message" => 'Successfully created.', "data" => $newProf], 200);
        }
        return response()->json(['message' => 'Forbidden. Is this your user?'], 403);
    }

    public function show($id)
    {
        // I see no reason as of yet (6/7/21) to protect this further.
        return Professor::where('fsc_id', $id)->first();
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $prof = Professor::where('fsc_id', $id)->first();

        if ($user->isAdmin())
        {
            $prof->update($request->all());
            return response()->json(['message' => 'Updated successfully.', 'data' => $prof], 200);
        }

        if ($user->isProf() && $user->fsc_id == $prof->fsc_id)
        {
            $prof->update($request->all());
            return response()->json(['message' => 'Updated successfully.', 'data' => $prof], 200);
        }
        return response()->json(['message' => 'Forbidden. Is this your user?'], 403);
    }

    public function destroy($id)
    {
        // This should follow "Only Admins delete users" until otherwise noted.
        if (Auth::user()->isAdmin())
        {
            $deletedProfs = Professor::where('fsc_id', $id)->delete();
            return response()->json(['message' => 'Successfully deleted.', 'data' => $deletedProfs], 200);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }
}