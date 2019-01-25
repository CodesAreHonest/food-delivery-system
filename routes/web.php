<?php

use Illuminate\Support\Facades\Route;


Route::prefix('member')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('member.login');
    Route::get('/', 'FoodDeliveryController@index')->name('member.home');

    Route::get('/manage/account', 'FoodDeliveryController@index')->name('member.manage.account');
    Route::get('/credit/card', 'FoodDeliveryController@index')->name('member.credit.card');
});

Route::prefix('restaurant')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('member.login');
    Route::get('/', 'FoodDeliveryController@index')->name('member.home');

    Route::get('/manage/account', 'FoodDeliveryController@index')->name('member.manage.account');
});
