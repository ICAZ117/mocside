<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Code;
use App\Models\Progress;

class CodeController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required',
            'problem_id' => 'required',
            'code' => 'nullable',
        ]);

        if ($validData['code'] == null) {
            $validData['code'] == ' ';
        }

        // in this case, we are creating a new code entry.
        // like with checking, we must touch progress
        $progress = Progress::where('fsc_id', '=', $user->fsc_id)->first();
        if (!$progress) {
            // create progress?
            // I hope we can take care of this in user creation,
            // but if it's not done, we get a 500 here.
            $labs_book = [];
            $problems_book = [];
            $progress_book = [];
            $progress = Progress::create([
                'fsc_id' => $user->fsc_id,
                'labs' => json_encode($labs_book),
                'assignments' => json_encode($problems_book),
                'progress' => json_encode($progress_book)
            ]);
        }
        $progress->touchDate($validData['problem_id']);

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
            // this route gets called when opening a problem
            // So I'm gonna leave a footprint on the user's progress obj.
            $progress = Progress::where('fsc_id', '=', $user->fsc_id)->first();
            $progress->touchDate($id);
            $code = Code::where([
                ['fsc_id', '=', $user->fsc_id],
                ['assignment_id', '=', $id],
                ['lang', '=', $validData["lang"]]
            ])->get();
            return response()->json(['message' => 'Progress found', 'dump' => $code], 200);
        } else {
            return response()->json(['message' => 'No progress. Please create.'], 200);
        }
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $code = Code::findOrFail($id);
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