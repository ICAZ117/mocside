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
        if (Auth::user()->isAdmin())
        {
            return Student::all();
        }
    }

    public function store(Request $request)
    {
        // Auth::user() is the user who made the request,
        // and I know they are authorized because of the
        // earlier middleware.
        $user = Auth::user();
        $validData = $request->validate([
            'fsc_id' => 'required|int',
        ]);

        if ($user->isAdmin())
        {
            $stud = Student::create($validData);
            return response()->json(['message' => 'Successfully created student.', 'data' => $stud], 200);
        }

        if ($user->fsc_id == $validData['fsc_id'])
        {
            $stud = Student::create($validData);
            return response()->json(['message' => 'Successfully created student.', 'data' => $stud], 200);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function show($id)
    {
        // as an admin, this will return the user that contains the student
        if (Auth::user()->isAdmin())
        {
            $user = Student::where('fsc_id', $id)->first();
            if (!$user) {
                return response()->json(['message' => 'couldn\'t find student with id '.$id], 410);
            }
            $user = $user->user;
            return new UserResource($user);
            // return response()->json(['message' => $user]);
        }

        $request_id = Auth::user()->fsc_id;
        if ($request_id == $id)
        {
            // return Student::where('fsc_id', $request_id)->first();
            // this should, in theory, create a student user if one doesn't exist
            // the first time we try and get info from it.
            return Student::firstOrCreate(['fsc_id' => $id]);
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
        // This will follow the "only admins can delete users" logic until otherwise needed.
        if (Auth::user()->isAdmin())
        {
            $stud = Student::where('fsc_id', $id)->delete();
            return response()->json(['message' => 'Delete successful', 'data' => $stud], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }
}