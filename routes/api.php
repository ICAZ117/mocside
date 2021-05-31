<?php

use App\Http\Controllers\AssignmentController;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LabController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TestCaseController;

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
    Route::get('/users/{id}', function ($id) {
        return User::findOrFail($id);
    });

    Route::resource('courses', CourseController::class);
    
    Route::get('/labs/{course_id}', [LabController::class, 'showCourse']);
    Route::post('/labs', [LabController::class, 'store']);
    Route::put('/labs/{id}', [LabController::class, 'update']);
    Route::delete('/labs/{id}', [LabController::class, 'destroy']);
    // Route::get('/labs', [LabController::class, 'index']);

    Route::get('/problems/{id}', [AssignmentController::class, 'showRes']);
    Route::post('/problems', [AssignmentController::class, 'store']);
    Route::put('/problems/{id}', [AssignmentController::class, 'update']);
    Route::delete('/problems/{id}', [AssignmentController::class, 'destroy']);
    // we need this route for populating the workspace, but not for displaying list.
    Route::get('/problems/full/{id}', [AssignmentController::class, 'show']);

    Route::get('/test-cases/{problem_id}', [TestCaseController::class, 'getCases']);
    Route::get('/test-cases/full/{id}', [TestCaseController::class, 'show']);
    Route::post('/test-cases', [TestCaseController::class, 'store']);
    Route::put('/test-cases/{id}', [TestCaseController::class, 'update']);
    Route::put('/test-cases/{id}', [TestCaseController::class, 'destroy']);

    Route::post('/professors', [ProfessorController::class, 'store']);
    Route::put('/professors/{id}', [ProfessorController::class, 'update']);
    Route::get('/professors/{id}', [ProfessorController::class, 'show']);
    Route::delete('/professors/{id}', [ProfessorController::class, 'destroy']);

    Route::post('/students', [StudentController::class, 'store']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::destroy('/students/{id}', [StudentController::class, 'destroy']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
