<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('member')->group(function() {

    Route::post('/member/register', 'Member\RegisterController@register');
    Route::get('/member/login', 'Member\LoginController@login');

});


