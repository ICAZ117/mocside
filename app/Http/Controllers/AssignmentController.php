<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Assignment;
use App\Models\Lab;
use App\Http\Resources\AssignmentResource;
use App\Http\Resources\FullAssignmentResource;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     * This should be a debugging exclusive,
     * if the route is registered at all.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // This check is remaining isAdmin because of the scope.
        if (Auth::user()->isAdmin()) {
            return Assignment::all();
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Store a newly created resource in storage,
     * and returns it as it's properly formatted
     * JSON resource as defined elsewhere.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'due_date' => 'required',
            'lab_id' => 'required|int',
            'copy_id' => 'required|int',
            'java_starter' => 'required',
            'python_starter' => 'required',
        ]);
        $lab = Lab::find($validData['lab_id']);
        $owner = $lab->course->owner_id;

        if ($user->isAdmin()) {
            $assignment =  Assignment::create($validData);
            return new AssignmentResource($assignment);
        }

        if ($user->isProf() && $user->fsc_id == $owner) {
            return new AssignmentResource(Assignment::create($validData));
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
        // this resource contains the gradbook.
        $user = Auth::user();
        $assignment = Assignment::find($id);
        // as such I am protecting it behind course ownership.
        $owner = $assignment->lab->course->owner_id;  // with an admin bypass, of course.
        if (($user->isProf() && $user->fsc_id == $owner) || $user->isAdmin()) {
            return new FullAssignmentResource($assignment);
        } else {
            return new AssignmentResource($assignment); 
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }


    // shows listing of assignments by LAB ID and then returns
    // a collection of JSON resources.
    public function showRes($lab_id)
    {
        $listOfAssignments = Lab::find($lab_id)->assignments;
        $assignmentRes = AssignmentResource::collection($listOfAssignments);
        return $assignmentRes;
    }

    // shows listing of assignments that prof has copied to other courses.
    public function showCopies($id)
    {
        // some of this functionality could live in the assignment model instead, 
        // but here is good for now
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $owner = $assignment->lab->course->owner_id;
        // copies inclues $assignment
        $copies = Assignment::where('copy_id', $assignment->copy_id);

        // I'm going to leave extras from FullAssignmentResource out for now.
        if ($user->isAdmin()) {
            return AssignmentResource::collection($copies);
        }

        // this is split into two if statements to accomodate a future logic change.
        if ($user->isProf() && $user->fsc_id == $owner) {
            return AssignmentResource::collection($copies);
        }

        return response()->json(['message' => 'Forbidden. Is this your assignment?'], 403);
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
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $lab = Lab::find($assignment->lab_id);
        $owner = $lab->course->owner_id;

        $isOriginal = $assignment->copy_id == $assignment->id;
        $copies = Assignment::where('copy_id', $assignment->copy_id)->orderBy('id')->get();
        $hasChildren = count($copies) > 1;

        if ($isOriginal && $hasChildren) {
            // create new object with edited data
            $new_assignment = $assignment->replicate();
            $new_assignment->push();
            $new_assignment->update($request->all());

            // point lab 1 at new object
            // this should already happen from the replicate

            // point lab 2 at old object,
            $lab2_id = $copies[1]->lab_id;
            $assignment->lab_id = $lab2_id;

            // and then delete husk.
            $copies[1]->delete();
        }

        if ($user->isAdmin() || ($user->isProf() && $user->fsc_id == $owner)) {
            $assignment->update($request->all());
            $assignment->copy_id = $assignment->id;
            $assignment->save();
            return response()->json(["message" => "Update successful."], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    public function updateUniques(Request $request, $id) {
        // assuming we want local edit w/o copy_id change
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $lab = $assignment->lab;
        $owner = $lab->course->owner_id;

        if ($user->isAdmin() || ($user->isProf() && $user->fsc_id == $owner)) {
            $assignment->update($request->all());
            return response()->json(["message" => "Update successful."], 200);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }

    // 
    public function updateChildren(Request $request, $id)
    {
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $copies = Assignment::where('copy_id', $assignment->copy_id)->orderBy('id')->get();
        $lab = $assignment->lab;
        $owner = $lab->course->owner_id;

        if ($user->isAdmin() || ($user->isProf() && $user->fsc_id == $owner)) {
            for ($i = 0; $i < count($copies); $i++) {
                $copies[$i]->update($request->all());
            }
            return response()->json(['messsage' => 'Updated all copies.'], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
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
        $first = Assignment::find($id);
        $lab = Lab::find($first->lab_id);
        $owner = $lab->course->owner_id;
        if (($user->isProf() && $user->fsc_id == $owner) || $user->isAdmin()) {
            $copies = Assignment::where('copy_id', $first->copy_id)->orderBy('id')->get();
            // $copies[0] is the original
            // $copies[1] is the successor in case of original delete.
            $isOriginal = $first->copy_id == $first->id;
            if ($isOriginal) {
                if (count($copies) > 1) {
                    // fix pointers
                    // $course1 = $first->course;
                    $lab2 = $copies[1]->lab;
                    $first->lab_id = $lab2->id;
                    $first->save();
                    // delete copies[1]
                    $husk = $copies[1];
                    // delete test cases from husk
                    foreach ($husk->test_cases as $tc) {
                        $tc->delete();
                    }
                    $husk->delete();
                    return response()->json(['message' => 'Delete successful and pointers cleaned.', 'data' => $husk], 200);
                } else {
                    // we are deleting sole copy
                    // delete test cases
                    foreach ($first->test_cases as $tc) {
                        $tc->delete();
                    }
                    $first->delete();
                    return response()->json(['message' => 'Delete sucessful with no cleanup.', 'data' => $first], 200);
                }
            }
            // delete $id
            // delete test cases
            foreach ($first->test_cases as $tc) {
                $tc->delete();
            }
            $first->delete();
            return response()->json(['message' => 'Delete sucessful with no cleanup.', 'data' => $first], 200);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }


    // get copies by assignment ID
    // assumes you know the ID of some assignment, finds all sibilings.
    public function getCopies($id)
    {
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $copies = Assignment::where('copy_id', $assignment->copy_id)->orderBy('id')->get();
        $lab = $assignment->lab;
        $owner = $lab->course->owner_id;
        if (($user->isProf() && $user->fsc_id == $owner) || $user->isAdmin()) {
            return AssignmentResource::collection($copies);
        }
        return response()->json(['message' => 'Forbidden. Are these your assignments?'], 403);
    }

    // creates a copy of an assignment and attaches it to a new lab.
    public function copy(Request $request, $id)
    {
        // Request with new lab ID
        $validData = $request->validate([
            'lab_id' => 'required|int',
        ]);
        $seed = Assignment::findOrFail($id);
        
        // owner/admin gate
        $user = Auth::user();
        $owner = $seed->lab->course->owner_id;
        if (($user->isProf() && $user->fsc_id == $owner) || $user->isAdmin()) {

            // create copy of assignment
            $new_assignment = $seed->replicate();
            $new_assignment->push();
            $new_assignment->update($validData);

            // cleanse gradebook
            $new_assignment->gradebook = "[]";
            $new_assignment->save();

            // create copy of all test cases
            $test_cases = $seed->test_cases;
            for ($i = 0; $i < count($test_cases); $i++) {
                $temp_case = $test_cases[$i]->replicate();
                $temp_case->push();
                $temp_case->assignment_id = $new_assignment->id;
                $temp_case->save();
            }
            return new FullAssignmentResource($new_assignment);

        }
        return response()->json(['message' => 'Forbidden. Is this your assignment?'], 403);
    }
}
