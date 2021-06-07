<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function store(Request $request)
    {
        $request_id = Auth::user()->fsc_id;
        if ($request_id == $id)
        {
            $validData = $request->validate([
                'fsc_id' => 'required|int',
            ]);
            return Student::create($validData);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function show($id)
    {
        if (Auth::user()->isAdmin())
        {
            $user = Student::where('fsc_id', $id)->first()->user;
            return new UserResource($user);
            // return response()->json(['message' => $user]);
        }

        $request_id = Auth::user()->fsc_id;
        if ($request_id == $id)
        {
            return Student::where('fsc_id', $request_id)->first();
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function update(Request $request, $id)
    {
        if (Auth::user()->isAdmin())
        {
            $student = Student::where('fsc_id', $id)->first();
            $student->update($request->all());
            return response()->json(['message' => $student]);
        }

        $request_id = Auth::user()->fsc_id;
        if ($request_id == $id)
        {
            $student = Student::where('fsc_id', $request_id)->first();
            $student->update($request->all());
            return $student;
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function destroy($id)
    {
        if (Auth::user()->isAdmin())
        {
            $stud = Student::where('fsc_id', $id)->delete();
            return response()->json(['message' => 'delete sucessfull', 'data' => $stud], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }
}