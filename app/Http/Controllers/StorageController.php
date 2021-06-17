<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\File;
use App\Models\Code;

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
        $user = Auth::user();
        $head = $user->fsc_id . '//code//' . $request->problem_id;
        try {
            $filePath = Storage::disk('local')->putFile($head, $request->file);
            return response()->json(['message' => $filePath], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }

    public function createFile(Request $request, $id)
    {
        // $id is problem_id
        $user = Auth::user();
        $progress = Code::where([
            ['fsc_id', '=', $user->fsc_id],
            ['lang', '=', $request->lang],
            ['assignment_id', '=', $id],
        ])->first();
        $validData = $request->validate([
            'lang' => 'required',
        ]);
        $head = "/home/max/mocside/storage/app/submissions/" . $user->fsc_id . "/code/" . $id . '/';
        if ($validData['lang'] == 'python') { // because python is best
            // make python file
            $file = fopen("submission.py", "w");
            $code = $progress->code;
            fwrite($file, $code);
            // can I send the file to Laravel storage?
            $filePath = Storage::disk('local')
                ->putFileAs('submissions/' . $user->fsc_id . '/' . $id, new File("submission.py"), "/submission.py");
            fclose($file);
            return response()->json(['message' => 'Python code stored.', 'path' => $filePath], 200);
        } else {
            // make java file
            $file = fopen($head . "submission.java", "w");
            $code = $progress->code;
            fwrite($file, $code);
            fclose($file);
            return response()->json(['message' => 'Python code stored.', 'path' => $head], 200);
        }
    }
}