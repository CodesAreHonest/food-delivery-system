<?php

use Illuminate\Support\Facades\Route;


Route::prefix('member')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('member.login');
    Route::get('/', 'FoodDeliveryController@index')->name('member.home');

    Route::get('/manage/account', 'FoodDeliveryController@index')->name('member.manage.account');
    Route::get('/credit/card', 'FoodDeliveryController@index')->name('member.credit.card');
});

Route::prefix('restaurant')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('restaurant.login');
    Route::get('/', 'FoodDeliveryController@index')->name('restaurant.home');

    Route::get('/manage/account', 'FoodDeliveryController@index')->name('restaurant.manage.account');
    Route::get('/delivery/list', 'FoodDeliveryController@index')->name('restaurant.sales.history');
    Route::get('/delivery/team', 'FoodDeliveryController@index')->name('restaurant.sales.history');
});
