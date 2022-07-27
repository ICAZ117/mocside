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
use App\Http\Controllers\GradebookController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\LabController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TestCaseController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserResource;

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

// I want this out of auth lock :) 
Route::post('/convert-markdown', [StorageController::class, 'convertMarkdown']);

Route::middleware(['auth:sanctum', 'active'])->group(function () {
    Route::get('/users/auth', AuthController::class);
    Route::put('/users/auth/{id}', [UserController::class, 'updateProfile']);
    Route::get('/users/{id}', function ($id) {
        return User::findOrFail($id);
    });
    Route::get('/users/profile/{id}', function ($id) {
        return new UserResource(User::where('fsc_id', '=', $id)->first());
    });
    Route::post('/users/elevate/{id}', [UserController::class, 'update']);
    Route::post('/users/downgrade/{id}', [UserController::class, 'downgrade']);
    Route::delete('/users/disable/{id}', [UserController::class, 'destroy']); // this is a soft delete
    Route::delete('/users/delete/{id}', [UserController::class, 'delete']); // this is a hard delete
    Route::post('/users/activate/{id}', [UserController::class, 'activate']);

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
    Route::post('/test-cases/export/{id}', [ContainerController::class, 'exportTCs']);

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
    Route::post('/progress/submit/{id}', [ProgressController::class, 'recordProgress']);
    Route::put('/progress/{id}', [ProgressController::class, 'update']);
    Route::delete('/progress/{id}', [ProgressController::class, 'destroy']);

    Route::get('/code/{id}', [CodeController::class, 'show']);
    Route::get('/code/search/{problem_id}', [CodeController::class, 'find']);
    Route::post('/code/check/{id}', [CodeController::class, 'checkProgress']);
    Route::post('/code', [CodeController::class, 'store']);
    Route::put('/code/{id}', [CodeController::class, 'update']);
    Route::delete('/code/{id}', [CodeController::class, 'delete']);

    Route::post('/code/submit/{id}', [StorageController::class, 'createFile']);

    Route::get('/containers/{id}', [ContainerController::class, 'checkStatus']);
    Route::get('/containers/logs/{id}', [ContainerController::class, 'getLogs']);
    Route::post('/containers/send-in/{id}', [ContainerController::class, 'sendInNoRead']);
    Route::post('/containers/spin-up/{id}', [ContainerController::class, 'spinUpNoRead']);
    Route::post('/containers/grade/{id}', [ContainerController::class, 'grade']);
    Route::delete('/containers/{id}', [ContainerController::class, 'spinDown']);

    Route::post('/gradebook/init/{id}', [GradebookController::class, 'initGradebook']);
    Route::post('/enroll/gradebook/{id}', [GradebookController::class, 'enroll']);
    Route::put('/courses/gradebook/{id}', [GradebookController::class, 'updateCourse']);
    Route::put('/labs/gradebook/{id}', [GradebookController::class, 'updateLab']);
    Route::put('/problems/gradebook/{id}', [GradebookController::class, 'updateAssignment']);
    Route::post('/gradebook/submit/{id}', [GradebookController::class, 'submitAssignment']);
    Route::get('/gradebook/{id}', [GradebookController::class, 'smallBook']);
    Route::post('/gradebook/worth', [GradebookController::class, 'worthBook']);

    Route::get('/invite/course/{id}', [InviteController::class, 'index']);
    Route::get('/invite/{key}', [InviteController::class, 'show']);
    Route::post('/invite', [InviteController::class, 'store']);
    Route::post('/invite/enroll/{key}', [InviteController::class, 'enroll']);
    Route::put('/invite/{id}', [InviteController::class, 'update']);
    Route::delete('/invite/{id}', [InviteController::class, 'delete']);
	Route::post('/invite/add/{id}', [InviteController::class, 'addStudent']);

    Route::put('/profile/full/{id}', [ProfileController::class, 'updateFullProfile']);
    Route::put('/profile/pfp', [ProfileController::class, 'updatePFP']);
    Route::put('/profile/settings', [ProfileController::class, 'updateSettings']);
    Route::post('/profile/init', [ProfileController::class, 'initProfile']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
