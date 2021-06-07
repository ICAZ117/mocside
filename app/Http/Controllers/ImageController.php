<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        try {
            $filePath = Storage::disk('public')->putFile('images', $request->file);
            return response()->json(['message' => $filePath, 'asset_link' => asset('storage/'.$filePath)], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }
}