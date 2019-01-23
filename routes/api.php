<?php

use Illuminate\Http\Request;


Route::post('/member/register', 'Member\RegisterController@register');
Route::post('/member/login', 'Member\LoginController@login');



