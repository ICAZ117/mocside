<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Professor;

class ProfessorController extends Controller
{
    public function index()
    {
        return Professor::all();
    }

    public function store(Request $request)
    {
        if (Auth::user()->isAdmin())
        {
            $validData = $request->validate([
                'fsc_id' => 'required|int',
            ]);
            return Professor::create($validData);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }

    public function show($id)
    {
        return Professor::where('fsc_id', $id);
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->isAdmin())
        {
            $prof = Professor::where('fsc_id', $id);
            $prof->update($request->all());
            return response()->json(['message' => 'Updated sucessfully.'], 200);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }

    public function destroy($id)
    {
        if (Auth::user()->isAdmin())
        {
            $deletedProfs = Professor::where('fsc_id', $id)->delete();
            return $deletedProfs;
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }
}