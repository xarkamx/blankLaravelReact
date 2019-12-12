<?php

use App\Http\Controllers\Logs\LogController;

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


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth',

], function ($router) {
    Route::post('login', 'Auth\JWTController@login');
    Route::post('logout', 'Auth\JWTController@logout');
    Route::post('refresh', 'Auth\JWTController@refresh');
    Route::post('me', 'Auth\JWTController@me')->middleware('validate:1');
    Route::get('me', 'Auth\JWTController@me')->middleware('validate:1');
});
