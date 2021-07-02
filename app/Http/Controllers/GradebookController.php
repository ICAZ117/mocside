<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\Lab;
use App\Models\Student;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class GradebookController extends Controller
{
    public function initGradebook(Request $request, $id)
    {
        // create gradebook for relevant scope
        // $id will be dependent on scope in request
        $user = Auth::user();
        $validData = $request->validate([
            'scope' => 'required', // course, lab, assignment, student
        ]);
        if (strcasecmp($validData['scope'], 'student') == 0) {
            // init student gradebook.
            $student = Student::findOrFail($id);
            if ($user->fsc_id == $student->fsc_id || $user->isAdmin()) {
                // these will be empty, they should be called upon student creation.
                $lab_book = array(
                    'labs' => [],
                    'grades' => array()
                );
                $course_book = array(
                    'courses' => [],
                    'grades' => array(),
                );
                $assignment_book = array(
                    'assignments' => [],
                    'grades' => array(),
                );
                $student->gradebook_courses = json_encode($course_book);
                $student->gradebook_labs = json_encode($lab_book);
                $student->gradebook_problems = json_encode($assignment_book);
                $student->save();
                return response()->json(['message' => 'Student gradebook initialized', 'dump' => $student], 200);
            } else {
                return response()->json(['message' => 'This is not your student record!'], 403);
            }
        } else {
            // were are creating the other style of gradebook,
            // and all three of these options look similar
            $book = array(
                'students' => [],
                'grades' => array()
            );
            if (strcasecmp($validData['scope'], 'course') == 0) {
                $course = Course::find($id);
                $owner_id = $course->owner_id;
                // on course creation, there will be no roster
                // therefore, the gradebook will remain empty
                if ($user->fsc_id == $owner_id || $user->isAdmin()) {
                    $course->gradebook = json_encode($book);
                    $course->save();
                    return response()->json(['message' => 'Gradebook initialized for course ' . $id, 'dump' => $course], 200);
                } else {
                    return response()->json(['message' => 'This is not your course!'], 403);
                }
            } else if (strcasecmp($validData['scope'], 'lab') == 0) {
                $lab = Lab::find($id);
                // in this case, the parent course may have a roster.
                $course_id = $lab->course_id;
                $course = Course::find($course_id);
                $owner = $course->owner_id;
                if ($user->fsc_id == $owner || $user->isAdmin()) {
                    $roster = $course->roster;
                    $roster = json_decode($roster, true);
                    foreach ($roster['roster'] as $student_id) {
                        array_push($book['students'], $student_id);
                        $book['grades'][$student_id] = '0';
                    }
                    $lab->gradebook = json_encode($book);
                    $lab->save();
                    return response()->json(['message' => 'Gradebook initialized for lab ' . $id, 'dump' => $lab], 200);
                } else {
                    return response()->json(["message" => 'this is not your course'], 403);
                }
            } else {
                $assignment = Assignment::find($id);
                // this will be similar to the process for labs.
                $lab_id = $assignment->lab_id;
                $lab = Lab::find($lab_id);
                $course_id = $lab->course_id;
                $course = Course::find($course_id);
                $owner = $course->owner_id;
                if ($user->fsc_id == $owner || $user->isAdmin()) {
                    $roster = $course->roster;
                    $roster = json_decode($roster, true);
                    foreach ($roster['roster'] as $student_id) {
                        array_push($book['students'], $student_id);
                        $book['grades'][$student_id] = '0';
                    }
                    $assignment->gradebook = json_encode($book);
                    $assignment->save();
                    return response()->json(['message' => 'Gradebook initialized for assignment ' . $id, 'dump' => $assignment], 200);
                } else {
                    return response()->json(["message" => 'this is not your course'], 403);
                }
            }
        }
    }

    public function enroll($id)
    {
        // enroll a student in a new course, update gradebook
        $user = Auth::user(); // a user has to sign up before accepting a course inv
        $student = Student::where('fsc_id', '=', $user->fsc_id)->first();
        // $id is course_id
        $course = Course::find($id);
        if (!($student->inCourse($id))) {
            $course_book = json_decode($course->gradebook, true);
            // update course
            array_push($course_book['students'], $user->fsc_id);
            $course_book['grades'][$user->fsc_id] = '0';
            $course->gradebook = json_encode($course_book);
            $course->save();
            // update labs and assignments
            $labs = $course->labs;
            foreach ($labs as $lab) {
                $assignments = $lab->assignments;
                // update lab
                $lab_book = json_decode($lab->gradebook, true);
                array_push($lab_book['students'], $user->fsc_id);
                $lab_book['grades'][$user->fsc_id] = '0';
                $lab->gradebook = json_encode($lab_book);
                $lab->save();

                foreach ($assignments as $assignment) {
                    // update assignment
                    $assignment_book = json_decode($assignment->gradebook, true);
                    array_push($assignment_book['students'], $user->fsc_id);
                    $assignment_book['grades'][$user->fsc_id] = '0';
                    $assignment->gradebook = json_encode($assignment_book);
                    $assignment->save();
                }
            }
            // add course to student gradebook
            $student_course_book = json_decode($student->gradebook_courses, true);
            array_push($student_course_book['courses'], $id);
            $student_course_book['grades'][$id] = '0';
            $student->gradebook_courses = $student_course_book;
            $student->save();
            return response()->json(['message' => "User enrolled in course " . $id, 'dump' => $student], 200);
        }
        return response()->json(["message" => 'User already in course.'], 418);
    }

    public function updateCourse(Request $request, $id)
    {
        // update a course's gradebook
        // $id is course_id
        // since we will have access to a course's full gradebook
        // on the front end, I will require it to be submitted
        // in complete with the edited value.
        $validData = $request->validate([
            'gradebook' => 'required'
        ]);
        $user = Auth::user();
        $course = Course::find($id);
        $owner = $course->owner_id;
        // final update to course
        if ($user->fsc_id == $owner) {
            // we need to find all students affected by this change,
            // and edit their gradebook_courses field.
            $course_book = json_decode($course->gradebook, true);
            $newGradebook = json_decode($validData['gradebook']);
            foreach ($course_book['grades'] as $key => $value) {
                // $key holds studentID, $value holds grade
                $newGrade = $newGradebook['grades'][$key];
                if ($newGrade != $value) {
                    // change in student object
                    $student = Student::where('fsc_id', '=', $key)->first();
                    $student_course_book = $student->gradebook_courses;
                    $student_course_book['grades'][$id] = $newGrade;
                    $student->gradebook_courses = $student_course_book;
                    $student->save();
                } // otherwise grade was not changed
            }
            // update gradebook
            $course->gradebook = $validData['gradebook'];
            $course->save();
            return response()->json(['message' => 'Gradebook updated for course ' . $id], 200);
        }
        return response()->json(['message' => "This is not your course."], 403);
    }

    public function updateLab(Request $request, $id)
    {
        // update a lab's gradebook
        // $id is lab_id
        $validData = $request->validate([
            'gradebook' => 'required'
        ]);
        $user = Auth::user();
        $lab = Lab::find($id);
        // $course = $lab->course; should work here, 
        // but similar syntax has errored me in the past.
        $course = Course::find($lab->course_id);
        $owner = $course->owner_id;
        $newGradebook = json_decode($validData['gradebook']);
        if ($user->fsc_id == $owner) {
            $lab_book = json_decode($lab->gradebook, true);
            foreach ($lab_book['grades'] as $key => $value) {
                $newGrade = $newGradebook['grades'][$key];
                if ($newGrade != $value) {
                    // change in student object
                    $student = Student::where('fsc_id', '=', $key)->first();
                    $student_lab_book = $student->gradebook_labs;
                    $student_lab_book['grades'][$id] = $newGrade;
                    $student->gradebook_labs = $student_lab_book;
                    $student->save();
                } // otherwise grade was not changed
            }
            $lab->gradebook = $validData['gradebook'];
            $lab->save();
            return response()->json(['message' => 'Gradebook updated for lab '.$id], 200);
        }
        return response()->json(['message' => "This is not your lab."], 403);
    }

    public function updateAssignment(Request $request, $id)
    {
        // update an assignment's gradebook
        // $id is assignment_id
        $validData = $request->validate([
            'gradebook' => 'required'
        ]);
        $user = Auth::user();
        $assignment = Assignment::find($id);
        $lab = Lab::find($assignment->lab_id);
        $course = Course::find($lab->course_id);
        $owner = $course->owner_id;
        $newGradebook = json_decode($validData['gradebook']);
        if ($user->fsc_id == $owner) {
            $assignment_book = json_decode($assignment->gradebook, true);
            foreach ($assignment_book['grades'] as $key => $value) {
                $newGrade = $newGradebook['grades'][$key];
                if ($newGrade != $value) {
                    $student = Student::where('fsc_id', '='. $key)->first();
                    $student_assignment_book = $student->gradebook_problems;
                    $student_assignment_book['grades'][$id] = $newGrade;
                    $student->gradebook_problems = $student_assignment_book;
                    $student->save();
                }
            }
            $assignment->gradebook = $validData['gradebook'];
            $lab->save();
            return response()->json(['message' => 'Gradebook updated for problem '. $id], 200);
        }
        return response()->json(['message' => "This is not your problem."], 403);
    }

    public function updateStudent(Request $request, $id)
    {
        // update a student's gradebook
        // $id is fsc_id
    }

    public function submitAssignment(Request $request, $id)
    {
        // update all relevant gradebooks upon problem submission
        // $id is assignment_id
        $validData = $request->validate([
            'gradebook' => 'required' // json string of "tcID": "t;f"
        ]);
        $user = Auth::user();
        $fsc_id = $user->fsc_id;
        $student = Student::where('fsc_id', '=', $fsc_id)->first(); // this will fail rq if user not stu
        $assignment = Assignment::find($id);
        $test_cases = $assignment->test_cases;
        $case_book = json_decode($validData['gradebook'], true);
        $earned_points = 0;
        foreach ($test_cases as $tc) {
            // check to see if user passed case
            if ($case_book[$tc->id] == true) {
                // award points
                $earned_points = $earned_points + $tc->points;
            }
        }
        // now, propogate earned points.
        $lab = Lab::find($assignment->lab_id);
        $course = Course::find($lab->course_id);
        
        // first, give points in assignment books
        $assignment_book = json_decode($assignment->gradebook, true);
        $student_assignment_book = json_decode($student->gradebook_problems, true);
        // will this already be decoded? I am not sure.
        $assignment_book['grades'][$fsc_id] = $earned_points;
        // check to see if student has made previous progress on this assignment
        $hasAssignmentProgress = false; // if they have, it will be in this list and we just edit
        foreach ($student_assignment_book['assignments'] as $problem_id) {
            if ($problem_id == $id) {
                $hasAssignmentProgress = true;
                $old_grade = $assignment_book['grades'][$id];
                $earned_diff = $earned_points - $old_grade;
                break;
            }
        }
        if (!$hasAssignmentProgress) {
            // add assignment ID to list
            array_push($student_assignment_book['assignments'], $id);
        }
        $student_assignment_book['grades'][$id] = $earned_points;
        $assignment->gradebook = json_encode($assignment_book);
        $student->gradebook_problems = json_encode($student_assignment_book);

        // then, give points to lab
        // we have to find if the user has made progress on this lab
        // in which case we add to the current score, otherwise
        // we are initializing this user's lab progress to their score
        $lab_book = json_decode($lab->gradebook, true);
        $student_lab_book = json_decode($student->gradebook_labs, true);
        $hasLabProgress = false;
        $lab_list = json_decode($student_lab_book['labs'], true);
        foreach ($lab_list as $lab_id) {
            if ($lab_id == $lab->id) {
                $hasLabProgress = true;
                $lab_book['grades'][$fsc_id] = $lab_book['grades'][$fsc_id] + $earned_diff;
                $student_lab_book['grades'][$lab_id] = $student_lab_book['grades'][$lab_id] + $earned_diff;
                break;
            }
        }
        if (!$hasLabProgress) {
            array_push($lab_list, $lab->id);
            $student_lab_book['grades'][$lab_id] = $earned_points;
            $student_lab_book['labs'] = $lab_list;
            $lab_book['grades'][$fsc_id] = $earned_points;
        }
        $lab->gradebook = json_encode($lab_book);
        $student->gradebook_labs = json_encode($student_lab_book);

        // then, add points to course.
        $course_book = json_decode($course->gradebook, true);
        $student_course_book = json_decode($student->gradebook_courses, true);
        // the student MUST be in the course to have submitted this lab
        if ($hasAssignmentProgress) {
            // int_val doesn't work on objects, THIS BETTER WORK
            $course_book['grades'][$fsc_id] = int_val($course_book['grades'][$fsc_id]) + $earned_diff;
            $student_course_book['grades'][$course->id] = int_val($student_course_book['grades'][$course->id]) + $earned_diff;
        } else {
            $course_book['grades'][$fsc_id] = int_val($course_book['grades'][$fsc_id]) + $earned_points;
            $student_course_book['grades'][$course->id] = int_val($student_course_book['grades'][$course->id]) + $earned_points;
        }
        $course->gradebook = json_encode($course_book);
        $student->gradebook_courses = json_encode($student_course_book);

        $assignment->save();
        $lab->save();
        $course->save();
        $student->save();

        return response()->json([
            'message' => 'Did something.',
            'course_book' => $course->gradebook,
            'lab_book' => $lab->gradebook,
            'problem_book' => $lab->gradebook,
            'student' => $student
        ], 200);
    }
}
