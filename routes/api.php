<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/member/register', 'Member\RegisterController@register')->name('post.member.register');
Route::get('/member/detail', 'Member\MemberController@getDetail')->name('post.member.getDetail');
Route::post('/member/update/detail', 'Member\MemberController@updateDetail')->name('post.member.updateDetail');

