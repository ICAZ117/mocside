<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function store(Request $request)
    {
        try {
            $filePath = Storage::disk('local')->putFile('public/images', $request->file);
            return response()->json(['message' => asset('storage/'.$filePath)], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }
}