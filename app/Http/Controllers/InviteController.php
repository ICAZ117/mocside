<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\InviteCode;
use App\Models\Student;
use App\Models\Course;

class InviteController extends Controller
{
    // list by course
    public function index($id)
    {
        // $id is course ID
        $user = Auth::user();
        $course = Course::findOrFail($id);
        $owner = $course->owner_id;
        if ($user->fsc_id == $owner || $user->isAdmin()) {
            $codes = InviteCode::where('course_id', '=', $id)->get();
            return response()->json(['message' => 'found.', 'data' => $codes], 200);
        }
        return response()->json(['message' => 'This is not your course'], 403);
    }

    // show single by key
    public function show($key)
    {
        // displays single
        $code = InviteCode::where('join_key', '=', $key)->first();
        return response()->json(['message' => 'found.', 'data' => $code], 200);
    }

    // create new
    public function store(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'join_key' => 'required',
            'course_id' => 'required',
        ]);
        $course = Course::findOrFail($validData['course_id']);
        $owner = $course->owner_id;
        if ($user->fsc_id == $owner || $user->isAdmin()) {
            if (strcasecmp($validData['join_key'],'random') == 0) {
                // generate random, unique key
                $bytes = random_bytes(4);
                $new_key = bin2hex($bytes);
                // it is so incredibly unlikely that this will ever repeat that I will not check uniqueness.
                $validData['join_key'] = $new_key; 
                $code = InviteCode::create([
                    'join_key' => $new_key,
                    'course_id' => $validData['course_id']
                ]);
                return response()->json(['message' => 'Successful. (w/ random)', 'data' => $code], 200);
            } else {
                $code = InviteCode::create($validData);
                return response()->json(['message' => 'Successful.', 'data' => $code], 200);
            }
        }
        return response()->json(['message' => 'this is not your course'], 403);
    }

    // update
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $code = InviteCode::findOrFail($id);
        $course = Course::findOrFail($code->course_id);
        $owner = $course->owner_id;
        if ($user->fsc_id == $owner || $user->isAdmin()) {
            // update resource
            $code->update($request->all());
            return response()->json(['message' => 'Update Successful.', 'data' => $code], 200);
        }
        return response()->json(['message' => 'This is not your course.'], 403);
    }

    // enroll auth user in course by invite key
    public function enroll($key)
    {
        // puts student on relevant rosters
        $user = Auth::user();

        // check to be sure that the user is a student, before anything else
        $student = Student::where('fsc_id', '=', $user->fsc_id)->first();
        if (!$student) {
            return response()->json(['message' => 'No student found for current fsc_id.'], 403);
        }

        // $key is unique join string of course
        $code = InviteCode::where('join_key', '=', $key)->first();
        $course = Course::findOrFail($code->course_id);

        // check for code expiracy             max_uses = 0 => infinite uses
        if (($code->uses >= $code->max_uses && $code->max_uses != 0) || date("Y-m-d H:i:s") >= $code->expire_date) {
            return response()->json(['message' => 'Code no longer valid.'], 403);
        } else {
            $code->uses = $code->uses + 1;
            $code->save();
        }

        // populate rosters
        // IF this code fails, it will be because the user does not have these
        // columns properly initialized by init/gradebook 
        $course_roster = json_decode($course->roster, true);
        $student_roster = json_decode($student->courses, true);
        array_push($student_roster['courses'], $course->id);
        array_push($course_roster['roster'], $user->fsc_id);
        $course->roster = json_encode($course_roster);
        $student->courses = json_encode($student_roster);

        // we also need to init them in the course-wide gradebook
        $course_book = json_decode($course->gradebook, true);
        array_push($course_book['students'], $user->fsc_id);
        $course_book['grades'][$user->fsc_id] = 0;
        $course->gradebook = json_encode($course_book);

        $course->save();
        $student->save();

        return response()->json(['message' => 'Enrolled in course.'], 200);
    }

    // delete invite key.
    public function delete($id)
    {
        $user = Auth::user();
        $code = InviteCode::find($id);
        $course = Course::findOrFail($code->course_id);
        $owner = $course->owner_id;
        if ($user->fsc_id == $owner || $user->isAdmin()) {
            // delete resource
            $code->delete();
            return response()->json(['message' => 'Invite code deleted.', 'data' => $code], 200);
        }
        return response()->json(['message' => 'This is not your course.'], 403);
    }
}