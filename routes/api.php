<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('member')->group (function() {

    Route::post('/register', 'Member\RegisterController@register');
    Route::post('/login', 'Member\LoginController@login');

    Route::get('/detail', 'Member\MemberController@getDetail')->name('post.member.getDetail');
    Route::post('/update/detail', 'Member\MemberController@updateDetail')->name('post.member.updateDetail');
    Route::post('/update/credit/card', 'Member\MemberController@updateCreditCard')->name('post.member.updateCreditCard');

});

Route::prefix('restaurant')->group (function() {

    Route::post('/add/food', 'Restaurant\FoodController@addFood');

});
