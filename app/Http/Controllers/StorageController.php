<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\File;
use App\Models\Code;
use Parsedown;

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
        $head = 'submissions/' . $user->fsc_id . '/' . $id;
        if ($validData['lang'] == 'python') { // because python is best
            // make python file
            $path = "/var/www/html/mocside/storage/app/tmp/submission" . $user->fsc_id . ".py";
            $file = fopen($path, "w");
            $code = $progress->code;
            fwrite($file, $code);
            $filePath = Storage::disk('local')
                ->putFileAs($head, new File($path), "main.py");
            fclose($file);
            unlink($path);
            return response()->json([
                'message' => 'Python code stored.', 
                'path' => $filePath, 
            ], 200);
        } else {
            // make java file
            $path = "submission" . $user->fsc_id . ".java";
            $file = fopen($path, "w");
            $code = $progress->code;
            fwrite($file, $code);
            $filePath = Storage::disk('local')
                ->putFileAs($head, new File($path), "Main.java");
            fclose($file);
            unlink($path);
            return response()->json(['message' => 'Java code stored.', 'path' => $filePath], 200);
        }
    }

    // recieves markdown, and converts it to ProseMirror
    public function convertMarkdown(Request $request)
    {
        $validData = $request->validate([
            'markdown' => 'required'
        ]);
        // first, convert markdown to html
        $parser = new Parsedown();
        $parsed_html = $parser->setBreaksEnabled(true)->text($validData['markdown']);
        // then, convert html to ProseMirror
        $prose = (new \HtmlToProseMirror\Renderer)->render($parsed_html);
        // then, return ProseMirror JSON
        return response()->json(['data' => $prose], 200);
    }
}