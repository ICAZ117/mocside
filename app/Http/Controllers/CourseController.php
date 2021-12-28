<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Models\Course;
use App\Models\Student;
use App\Http\Resources\CourseResource;
use App\Http\Resources\FullCourseResource;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Course::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // I only want professors to be able to create a course
        if (Auth::user()->isProf()) {
            $validData = $request->validate([
                'name' => 'required',
                'description' => 'required',
                'owner_id' => 'required|int',
            ]);
            $course = Course::create($validData);
            $roster = array(
                'roster' => []
            );
            $course->roster = json_encode($roster);
            $course->save();
            return response()->json([
                'data' => $course,
                'message' => "Success."
            ]);
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
        try {
            $course = Course::findOrFail($id);
            return new CourseResource($course);
        } catch (ErrorException $e) {
            // Giving a misinfomed 200 here to try and not block processing.
            return response()->json(['message' => 'Resource not found. Please remove course from list.'], 200); 
        }
    }

    // displays course with gradebook, for admins and owners only.
    public function showFull($id)
    {
        $user = Auth::user();
        $course = Course::find($id);
        $owner = $course->owner_id;
        
        // prof check is unnecesary *in theory* which is why I've included it.
        if ($user->isAdmin() || ($user->fsc_id == $owner && $user->isProf()))
        {
            return new FullCourseResource($course);
        }
        return response()->json(["message" => 'Forbidden'], 403);
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
        $course = Course::find($id);
        $owner = $course->owner_id;
        $user = Auth::user();

        // I will include an admin check that can override the owner check.
        if ($user->isAdmin()) {
            $course->update($request->all());
            return response()->json(["message" => "Updated successfully."], 200);
        }

        // This logic checks for professor role as well as course ownership.
        if ($user->isProf() && $owner == $user->fsc_id) { 
            $course->update($request->all());
            return response()->json(['message' => 'Updated successfully.'], 200);
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
        $user = Auth::user();
        $course = Course::find($id);
        $owner_id = $course->owner_id;
        // I want to restrict course deletion to admins
        if ($user->fsc_id == $owner_id || $user->isAdmin()) {
            // also delete course picture
            $fileURL = $course->img_loc;
            $sections = explode("/", $fileURL);
            $fileID = end($sections);
            Storage::disk('public')->delete('images/' . $fileID);

            // we also have to delete all Invites for this course
            foreach ($course->invites as $invite) {
                $invite->delete();
            }

            // for each student in the course, call archive method
            $roster = json_decode($course->roster, true);
            foreach ($roster['roster'] as $student) {
                $student_obj = Student::where('fsc_id', $student)->first();
                $student_obj->courseArchived($course->id);
            }

            $course->delete();
            return response()->json(['message' => 'Successfully deleted course.'], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }
}
