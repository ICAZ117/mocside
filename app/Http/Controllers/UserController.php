<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Professor;
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
        // elevate user to professor
        if (Auth::user()->isProf())
        {
            $user = User::where('fsc_id', '=', $id)->first();
            $fsc_id = $user->fsc_id;
            // create prof object for elevated user
            $prof = Professor::create(['fsc_id' => $fsc_id]);
            $user->fsc_role = 'professor';
            $user->save();
            return new UserResource($user);
        }
        return response()->json(['message' => 'You must be a professor to complete this action.']);
    }

    public function downgrade($id) 
    {
        // return user to student perms
        $user = Auth::user();
        if ($user->isAdmin()) {
            $target = User::where('fsc_id', '=', $id)->first();
            if ($target->fsc_role == 'professor') {
                $target->fsc_role = 'professor';
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}