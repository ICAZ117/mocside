<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use App\Models\Professor;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function updateFullProfile(Request $request, $id)
    {
        $user = Auth::user();
        // $id is fsc_id
        if ($user->fsc_id == $id || $user->isAdmin()) {
            if ($user->isAdmin()) {
                $user = User::where('fsc_id', '=', $id)->first();
            }

            if ($user->fsc_role == 'student') {
                $fsc_user = Student::where('fsc_id', '=', $id)->first();
            } else {
                $fsc_user = Professor::where('fsc_id', '=', $id)->first();
            }

            // update relevant columns
            $validData = $request->validate([
                'username' => 'required',
                'pfp_path' => 'required',
                'screen_name' => 'required',
                'name' => 'required',
                'settings' => 'required',
                'pronouns' => 'required',
            ]);

            // update username
            $user->username = $validData['username'];
            // update pfp
            $user->pfp_path = $validData['pfp_path'];
            // update name
            $user->name = $validData['name'];
            // update settings
            $user->settings = json_encode($validData['settings']);
            // update screen_name
            $fsc_user->screen_name = $validData['screen_name'];
            // update pronouns
            $fsc_user->pronouns = $validData['pronouns'];

            $user->save();
            $fsc_user->save();

            return response()->json([
                'message' => 'Profile updated.',
                'data' => array(
                    'user' => $user,
                    'fsc' => $fsc_user
                )
            ], 200);
        }
        return response()->json(['message' => 'Forbidden.'], 403);
    }

    public function updatePFP(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'pfp_path' => 'required',
        ]);
        $user->pfp_path = $validData['pfp_path'];
        $user->save();
        return response()->json(['message' => 'Profile Picture updated.'], 200);
    }

    public function updateSettings(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'settings' => 'required',
        ]);
        $user->settings = $validData['settings'];
        $user->save();
        return response()->json(['message' => 'Preferences updated.'], 200);
    }

    public function initProfile()
    {
        $user = Auth::user();
        $settings = array(
            'consoleOptions' => array(
                'foreground' => 'black',
                'background' => 'green',
            ),
            'ideOptions' => array(
                'theme' => 'gob',
                'defaultLang' => 'python'
            )
        );
        $user->settings = json_encode($settings);
        $user->save();
        return response()->json(['message' => 'gob'], 200);
    }
}