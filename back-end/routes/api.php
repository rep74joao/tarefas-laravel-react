<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\RegisterController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
#3|f31LKyWeiOj7p5fY71GrLb6FvoySpzDdQI5XYU1b

Route::prefix('auth')->group(function (){
    Route::post('login', [LoginController::class, 'login']);
    Route::post('register', [RegisterController::class, 'register']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('create', [TaskController::class, 'create']);
    Route::get('getTasks/{id}', [TaskController::class, 'tasks']);
    Route::get('delete/{id}', [TaskController::class, 'delete']);
});
