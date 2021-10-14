<?php

namespace App\Http\Controllers;

use App\Events\ContainerOut;
use App\Events\InputSent;
use Broadcast;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TerminalController extends Controller
{
    // NOTE: This file is most likely useless, since I want client to be triggering events
    // and this implementation would get stuck in rate limiting.
    public function sendInput(Request $request)
    {
        $validMessage = $request->validate([
            'message' => 'required'
        ]);
        $user = Auth::user();
        broadcast(new InputSent($user, $validMessage['message']))->toOthers();
        return response()->json(['message' => 'input sent'], 200);
    }

    public function bounceLogs(Request $request, $user_id)
    {
        $validMessage = $request->validate([
            'message' => 'required',
        ]);
        broadcast(new ContainerOut($user_id, $validMessage['message']))->toOthers();
        return response()->json(['message' => 'log sent.'], 200);
    }
}