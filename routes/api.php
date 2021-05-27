<?php

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LabController;

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
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
