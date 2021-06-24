<?php

// builtins
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// models
use App\Models\User;

// controllers
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\ContainerController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LabController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TestCaseController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/sanctum/token', TokenController::class);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users/auth', AuthController::class);
    Route::put('/users/auth', [UserController::class, 'updateProfile']);
    Route::get('/users/{id}', function ($id) {
        return User::findOrFail($id);
    });
    Route::post('/users/elevate/{id}', [UserController::class, 'update']);

    Route::resource('courses', CourseController::class);
    // I hope this works.
    Route::get('/courses/full/{id}', [CourseController::class, 'showFull']);
    
    Route::get('/labs/{course_id}', [LabController::class, 'showCourse']);
    Route::get('/labs/full/{id}', [LabController::class, 'show']);
    Route::post('/labs', [LabController::class, 'store']);
    Route::put('/labs/{id}', [LabController::class, 'update']);
    Route::delete('/labs/{id}', [LabController::class, 'destroy']);
    // Route::get('/labs', [LabController::class, 'index']);

    Route::get('/problems/{lab_id}', [AssignmentController::class, 'showRes']);
    Route::post('/problems', [AssignmentController::class, 'store']);
    Route::put('/problems/{id}', [AssignmentController::class, 'update']);
    Route::delete('/problems/{id}', [AssignmentController::class, 'destroy']);
    // we need this route for populating the workspace, but not for displaying list.
    Route::get('/problems/full/{id}', [AssignmentController::class, 'show']);
    // copy functions
    Route::get('/problems/copies/{id}', [AssignmentController::class, 'getCopies']);
    Route::put('/problems/copies/{id}', [AssignmentController::class, 'updateChildren']);
    Route::post('/problems/copies/{id}', [AssignmentController::class, 'copy']);

    Route::put('/problems/unique/{id}', [AssignmentController::class, 'updateUniques']);

    Route::get('/test-cases/{problem_id}', [TestCaseController::class, 'getCases']);
    Route::get('/test-cases/full/{id}', [TestCaseController::class, 'show']);
    Route::post('/test-cases', [TestCaseController::class, 'store']);
    Route::put('/test-cases/{id}', [TestCaseController::class, 'update']);
    Route::delete('/test-cases/{id}', [TestCaseController::class, 'destroy']);

    Route::post('/professors', [ProfessorController::class, 'store']);
    Route::put('/professors/{id}', [ProfessorController::class, 'update']);
    Route::get('/professors/{id}', [ProfessorController::class, 'show']);
    Route::delete('/professors/{id}', [ProfessorController::class, 'destroy']);

    Route::post('/students', [StudentController::class, 'store']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::delete('/students/{id}', [StudentController::class, 'destroy']);

    Route::post('/images/store', [StorageController::class, 'storeImage']);
    Route::post('/code/store', [StorageController::class, 'storeCode']);

    Route::get('/progress/{id}', [ProgressController::class, 'show']);
    Route::post('/progress', [ProgressController::class, 'store']);
    Route::put('/progress/{id}', [ProgressController::class, 'update']);
    Route::delete('/progress/{id}', [ProgressController::class, 'destroy']);

    Route::get('/code/{id}', [CodeController::class, 'show']);
    Route::get('/code/search/{problem_id}', [CodeController::class, 'find']);
    Route::post('/code', [CodeController::class, 'store']);
    Route::put('/code/{id}', [CodeController::class, 'update']);
    Route::delete('/code/{id}', [CodeController::class, 'delete']);

    Route::post('/code/submit/{id}', [StorageController::class, 'createFile']);

    Route::post('/containers/test', [ContainerController::class, 'test']);
    Route::post('/containers/spin-up/{id}', [ContainerController::class, 'spinUp']);
    Route::delete('/containers/{id}', [ContainerController::class, 'spinDown']);
    Route::get('/containers/list', [ContainerController::class, 'list']);
    Route::post('/containers/spin-test/{id}', [ContainerController::class, 'spinWLib']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
