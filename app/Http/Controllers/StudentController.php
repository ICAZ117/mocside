<?php

namespace App\Http\Controllers;

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
        return resonse()->json(['message' => 'This is not your user!'], 403);
    }

    public function show($id)
    {
        if (Auth::user()->isAdmin())
        {
            return Student::where('fsc_id', $id)->first()->user;
        }

        $request_id = Auth::user()->fsc_id;
        if ($request_id == $id)
        {
            return Student::where('fsc_id', $request_id)->first();
        }
        return resonse()->json(['message' => 'This is not your user!'], 403);
    }

    public function update($id)
    {
        $request_id = Auth::user()->fsc_id;
        if ($request_id == $id)
        {
            $student = Student::where('fsc_id', $request_id)->first();
            $student->update($request->all());
            return $student;
        }
        return resonse()->json(['message' => 'This is not your user!'], 403);
    }

    public function destroy($id)
    {
        if (Auth::user()->isAdmin())
        {

        }
    }
}