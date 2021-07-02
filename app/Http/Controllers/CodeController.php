<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Code;

class CodeController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required',
            'problem_id' => 'required',
            'code' => 'required',
        ]);
        return Code::create([
            'fsc_id' => $user->fsc_id,
            'lang' => $validData['lang'],
            'assignment_id' => $validData['problem_id'],
            'code' => $validData['code'],
        ]);
    }

    public function show($id)
    {
        $user = Auth::user();
        $code = Code::find($id);
        if ($user->isAdmin() || ($user->fsc_id == $code->fsc_id)) {
            return $code;
        }
        return reponse()->json(['message' => 'This is not your code!'], 403);
    }

    public function find($problem_id)
    {
        $user = Auth::user();
        $code = Code::where([
            ['fsc_id', '=', $user->fsc_id],
            ['assignment_id', '=', $problem_id],
        ])->get();
        if ($user->isAdmin() || ($user->fsc_id == $code->fsc_id)) {
            return response()->json(['data' => $code], 200);
        }
        return reponse()->json(['message' => 'This is not your code!'], 403);
    }

    public function checkProgress(Request $request, $id)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required'
        ]);
        $hasProgress = $user->hasProgress($id, $validData['lang']);
        if ($hasProgress) {
            $code = Code::where([
                ['fsc_id', '=', $user->fsc_id],
                ['assignment_id', '=', $id],
                ['lang', '=', $validData->lang]
            ])->get();
            return response()->json(['message' => 'Progress found', 'dump' => $code], 200);
        } else {
            return response()->json(['message' => 'No progress. Please create.'], 200);
        }
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $code = Code::find($id);
        if ($user->isAdmin() || ($user->fsc_id == $code->fsc_id)) {
            $code->update($request->all());
            return $code;
        }
        return reponse()->json(['message' => 'This is not your code!'], 403);
    }

    public function delete($id)
    {
        $user = Auth::user();
        $code = Code::find($id);
        if ($user->isAdmin() || ($user->fsc_id == $code->fsc_id)) {
            $code->delete();
            return response()->json(['message' => 'delete successful.'], 200);
        }
        return reponse()->json(['message' => 'This is not your code!'], 403);
    }
}