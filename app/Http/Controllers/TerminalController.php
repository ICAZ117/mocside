<?php

namespace App\Http\Controllers;

use App\Events\InputSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TerminalController extends Controller
{
    public function sendInput(Request $request)
    {
        $validMessage = $request->validate([
            'message' => 'required'
        ])
        $user = Auth::user();
        broadcast(new InputSent($user, $validMessage['message']))
        return response()->json(['message' => 'input sent']);
    }
}