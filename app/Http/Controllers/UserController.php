<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Professor;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->isAdmin()) {
            return UserResource::collection(User::paginate());
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        if (Auth::user()->isAdmin()) {
          return new UserResource($user);
        }
        return  response()->json(["message" => "Forbidden"], 403);
    }

    
    public function update($id)
    {
        // elevate student to professor
        $user = Auth::user();
        if ($user->isProf() || $user->isAdmin()) {
            $target = User::where('fsc_id', '=', $id)->first();
            if ($target && ($target->fsc_role == 'student')) { // bruh I hope this line works... operator should 'short circut' and not fail if doesn't exist.
                $student = Student::where('fsc_id', '=', $id)->first();
                if ($student) {
                    $scn = $student->screen_name;
                    $prn = $student->pronouns;
                } else {
                    $scn = "";
                    $prn = "";
                }
                $target->fsc_role = 'professor';
                $target->save();
                $professor = Professor::where('fsc_id', '=', $id)->first();
                if (!$professor) {
                    $professor = Professor::create([
                        'fsc_id' => $id,
                        'screen_name' => $scn,
                        'pronouns' => $prn,
                        'courses' => json_encode(array('courses' => []))
                    ]);
                    return response()->json(['message' => 'User elevated and Prof object created', 'data' => $professor], 200);
                }
                return response()->json(['User elevated and old Prof object found.', 'data' => $professor], 200);
            }
            return response()->json(['message' => 'User doesn\'t exist or is already a professor', 'data' => $target]);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }

    public function downgrade($id) 
    {
        // return user to student perms
        $user = Auth::user();
        if ($user->isAdmin()) {
            $target = User::where('fsc_id', '=', $id)->first();
            if ($target && ($target->fsc_role == 'professor')) {
                $target->fsc_role = 'student';
                $target->save();
                $student = Student::where('fsc_id', '=', $id)->first();
                if (!$student) {
                    $student = Student::create(['fsc_id' => $id]);
                    // init students
                    return response()->json(['message' => 'New student created. Please POST to api/gradebook/init.', 'data' => $student], 200);
                }
                return response()->json(['message' => 'Old student found. Check for gradebook init.', 'data' => $student], 200);
            }
            return response()->json(['message' => 'User is not a professor; cannot be downgraded'], 403);
        }
        return response()->json(['message' => 'Unauthorized.'], 403);
    }

    public function updateProfile(Request $request, $id)
    {
        $user = Auth::user();
        if ($user->isAdmin() || $user->id == $id) {
            $user_object = User::find($id);
            $user_object->update($request->all());
            return response()->json(['message' => "Updated Profile", 'data' => new UserResource($user_object)], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }

    // public function updatePFP($id)
    // this should be achieved by storing the image and sending the updateProfile request with the correct path

    /**
     * Deactivates user account without deleting.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // change active status to false
        $user = Auth::user();
        if ($user->isAdmin() || $user->id == $id) {
            $target = User::where('fsc_id', '=', $id)->first();
            if ($target) {
                $target->status = false;
                $target->save();
                return response()->json(['message' => 'User deactivated.', 'data' => $target], 200);
            }
            return response()->json(['message' => 'User not found.'], 404);
        }
    }

    public function activate($id)
    {
        // change active status to true
        $user = Auth::user();
        if ($user->isAdmin()) {
            $target = User::where('fsc_id', '=', $id)->first();
            if ($target) {
                $target->status = true;
                $target->save();
                return response()->json(['message' => 'User activated.', 'data' => $target], 200);
            }
            return response()->json(['message' => 'User not found.'], 404);
        }
    }

    public function bigDelete($id)
    {
        // actually delete user resource
        $user = Auth::user();
        if ($user->isAdmin()) {
            $target = User::where('fsc_id', '=', $id)->first();
            if ($target) {
                $target->delete();
                return response()->json(['message' => 'User deleted.', 'data' => $target], 200);
            }
            return response()->json(['message' => 'User not found.'], 404);
        }
        // THIS FUNCTION IS NOT COMPLETE
        // IT MUST CLEAN THE USER ID FROM ALL PLACES IT IS USED
        // AND THEN DELETE THE USER
    }
}