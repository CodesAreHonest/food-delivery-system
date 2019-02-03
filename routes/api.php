<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('member')->group (function() {

    Route::post('/register', 'Member\RegisterController@register');
    Route::post('/login', 'Member\LoginController@login');

    Route::middleware('member_auth')->group(function() {

        Route::get('/detail', 'Member\MemberController@getDetail')->name('post.member.getDetail');
        Route::post('/update/detail', 'Member\MemberController@updateDetail')->name('post.member.update.detail');
        Route::post('/update/location', 'Member\MemberController@updateLocation')->name('post.member.update.location');
        Route::post('/update/credit/card', 'Member\MemberController@updateCreditCard')->name('post.member.updateCreditCard');
    });

});

Route::prefix('restaurant')->group (function() {

    Route::post('/register', 'Restaurant\RegisterController@register')->name('post.restaurant.register');
    Route::post('/login', 'Restaurant\LoginController@login')->name('post.restaurant.login');

    Route::middleware('restaurant_auth')->group(function () {

        Route::post('/add/food', 'Restaurant\FoodController@addFood');
        Route::post('/add/food/preview', 'Restaurant\FoodController@addFoodPreview');

        Route::post('/update/profile', 'Restaurant\RestaurantController@updateRestaurant')->name('post.update.restaurant');
        Route::get('/detail', 'Restaurant\RestaurantController@getRestaurant')->name('get.restaurant.detail');

        Route::get('/get/food', 'Restaurant\FoodController@getFood')->name('get.food.detail');
    });


});


    Route::post('/delivery/register', 'Delivery\RegisterController@register')->name('post.delivery.register');
    Route::post('/delivery/login', 'Delivery\LoginController@login')->name('post.delivery.login');
    Route::post('/delivery/update', 'Delivery\DeliveryController@updateDelivery')->name('post.delivery.update');
    Route::get('/delivery/get/detail', 'Delivery\DeliveryController@getDelivery')->name('get.delivery.detail');

    Route::post('/admin/register', 'Admin\RegisterController@register')->name('post.admin.register');
    Route::post('/admin/login', 'Admin\LoginController@login')->name('post.admin.login');

