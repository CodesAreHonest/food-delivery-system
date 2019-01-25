<?php

use Illuminate\Http\Request;


Route::post('/member/register', 'Member\RegisterController@register');
Route::post('/member/login', 'Member\LoginController@login');


Route::post('/member/register', 'Member\RegisterController@register')->name('post.member.register');
Route::get('/member/detail', 'Member\MemberController@getDetail')->name('post.member.getDetail');
Route::post('/member/update/detail', 'Member\MemberController@updateDetail')->name('post.member.updateDetail');
Route::post('/member/update/credit/card', 'Member\MemberController@updateCreditCard')->name('post.member.updateCreditCard');


