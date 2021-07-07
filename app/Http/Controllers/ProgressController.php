<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Progress;
use App\Models\Lab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function index()
    {
        // no
    }

    public function show($id)
    {
        $user = Auth::user();
        // $id is STUDENT->fsc_id
        if ($user->fsc_id == $id || $user->isAdmin()) {
            $progress = Progress::where('fsc_id', '=', $id)->first();
            if ($progress) {
                return response()->json(['message' => 'progress found', 'data' => $progress], 200);
            }
            return response()->json(['message' => 'not found'], 404);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        // check to make sure user sending update owns the progress object
        if ($user->fsc_id == $id || $user->isAdmin()) {
            // updating progress
            $progress = Progress::where('fsc_id', $id)->first();
            $progress->update($request->all());
            return response()->json(['message' => 'Update successfull.', 'data' => $progress], 200);
        }
        return response()->json(['message' => 'This is not your user!'], 403);
    }

    public function recordProgress(Request $request, $id)
    {
        // given outcome of problem, update progress.
        $user = Auth::user();
        // payload has {"51":false,"52":false,"53":false,"54":false}
        $validData = $request->validate([
            'gradebook' => 'required',
            'lang' => 'required'
        ]);
        // id is assignment_id
        $assignment = Assignment::find($id);
        $progress = Progress::where('fsc_id', '=', $user->fsc_id)->first();
        if (!$progress) {
            return response()->json(['message' => 'User progress has not been initialized.'], 403);
        }
        $progress_book = json_decode($progress->progress, true);
        $assignment_book = json_decode($progress->assignments, true);
        $lab_book = json_decode($progress->labs, true);


        // check first for prior inclusion in problems
        $hasAssignmentProgress = false;
        $hasLabProgress = false;
        for ($i = 0; $i < count($progress_book); $i++) {
            if ($progress_book[$i]['assignment_id'] == $id) {
                // these must go hand in hand
                $offset1 = $i;
                $hasAssignmentProgress = true;
                $hasLabProgress = true;
                break;
            }
        }
        // check first for prior inclusion in lab
        // need offset
        for ($i = 0; $i < count($lab_book); $i++) {
            if ($lab_book[$i]['lab_id'] == $assignment->lab_id) {
                $offset3 = $i;
                $hasLabProgress = true;
                break;
            }
        }

        // check for prior completion
        if ($hasAssignmentProgress) {
            for ($i = 0; $i < count($assignment_book); $i++) {
                if ($assignment_book[$i]['assignment_id'] == $id) {
                    $offset2 = $i;
                    if ($assignment_book[$i]['completed'] == true) {
                        // in this case, we only update progress date
                        // we will not allow the student to score lower.
                        $progress_book[$offset1]['chosen_lang'] = $validData['lang']; // lang may have changed as reason
                        $assignment_book[$i]['last_progress'] = date('Y-m-d');
                        $lab_book[$offset3]['last_progress'] = date('Y-m-d');
                        $progress->progress = json_encode($progress_book);
                        $progress->assignments = json_encode($assignment_book);
                        $progress->labs = json_encode($lab_book);
                        $progress->save();
                        return response()->json([
                            'message' => 'Previous completion, dates/lang updated.',
                            'data' => $progress
                        ], 200);
                    }
                    break;
                }
            }
        }

        // first, lets update $progress_book
        $cases_passed = [];
        $num_cases = 0;
        foreach (json_decode($validData['gradebook'], true) as $key => $value) {
            if ($value) {
                array_push($cases_passed, $key);
            }
            $num_cases++;
        }
        // build entry
        $temp = array(
            'assignment_id' => $assignment->id,
            'cases_passed' => $cases_passed,
            'chosen_lang' => $validData['lang']
        );


        // then, update $assignment_book
        $completed = count($cases_passed) == $num_cases;
        $temp2 = array(
            'assignment_id' => $assignment->id,
            'cases_passed' => count($cases_passed),
            'completed' => $completed,
            'last_progress' => date('Y-m-d')
        );

        // last, update $lab_book 
        if ($hasLabProgress) {
            if ($completed) {
                $num_completed = $lab_book[$offset3]['num_completed'] + 1;
            } else {
                $num_completed = $lab_book[$offset3]['num_completed'];
            }
        } else {
            if ($completed) {
                $num_completed = 1;
            } else {
                $num_completed = 0;
            }
        }
        // determine lab completion status
        $lab = Lab::find($assignment->lab_id);
        $lab_completed = count($lab->assignments) == $num_completed;
        $temp3 = array(
            'lab_id' => $assignment->lab_id,
            'num_completed' => $num_completed,
            'completed' => $lab_completed,
            'last_progress' => date('Y-m-d')
        );


        // propogate changes
        if ($hasAssignmentProgress) {
            // removing old objects
            array_splice($progress_book, $offset1);
            array_splice($assignment_book, $offset2);
        }
        if ($hasLabProgress) {
            array_splice($lab_book, $offset3);
        }
        // and replacing anew
        array_push($progress_book, $temp);
        $progress->progress = json_encode($progress_book);
        array_push($assignment_book, $temp2);
        $progress->assignments = json_encode($assignment_book);
        array_push($lab_book, $temp3);
        $progress->labs = json_encode($lab_book);

        $progress->save();
        return response()->json(['message' => 'progress saved', 'data' => $progress], 200);
    }

    public function store()
    {
        // this function will now create and init, and only be called on creation
        $user = Auth::user();
        $flag = Progress::where('fsc_id', '=', $user->fsc_id)->first();
        if (!$flag) {
            // create        Look, I know this looks redundant. Almost.
            $labs_book = [];
            $problems_book = [];
            $progress_book = [];
            $progress = Progress::create([
                'fsc_id' => $user->fsc_id,
                'labs' => json_encode($labs_book),
                'assignments' => json_encode($problems_book),
                'progress' => json_encode($progress_book)
            ]);
            return response()->json(['message' => 'progress created', 'data' => $progress], 200);
        } else {
            return response()->json(['message' => 'you already have progress', 'data' => $flag], 418);
        }
    }

    public function destroy($id)
    {
        // This will follow the "admin only delete" principle for now.
        if (Auth::user()->isAdmin()) {
            $deletedProgress = Progress::where('fsc_id', $id)->delete();
            return response()->json(['message' => "Delete successfull.", "data" => $deletedProgress], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }
}