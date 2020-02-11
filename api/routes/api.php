<?php


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
Route::apiResource("colors", "Style\ColorsController");

Route::group([

    'prefix' => 'profiles',
    'middleware' => 'api',

], function ($router) {

    Route::get('/{profileID}/permissions', 'Info\Profiles@getPermissions');
    Route::post('/{profileID}/permissions', 'Info\Profiles@setPermission');
    Route::delete('/{profileID}/permissions', 'Info\Profiles@killPermission');
});
Route::apiResource('profiles', 'Info\Profiles')->middleware('auth');
Route::apiResource('permissions', 'Info\Permissions')->middleware('auth');
Route::apiResource('user', 'Info\UsersController')->middleware('auth');
