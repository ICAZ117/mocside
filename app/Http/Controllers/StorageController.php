<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    public function storeImage(Request $request)
    {
        try {
            $filePath = Storage::disk('public')->putFile('images', $request->file);
            return response()->json(['message' => $filePath, 'asset_link' => asset('storage/'.$filePath)], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }

    public function storeCode(Request $request)
    {
        try {
            $filePath = Storage::disk('local')->putFile('code', $request->file);
            return response()->json(['message' => $filePath], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }
}