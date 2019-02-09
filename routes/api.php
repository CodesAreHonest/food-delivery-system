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

        Route::get('/get/food', 'Restaurant\FoodController@getFood')->name('get.food.detail');

        Route::post('/add/cart', 'Cart\CartController@addCart')->name('member.post.add.cart');
        Route::get('/get/cart', 'Cart\CartController@getCart')->name('member.get.cart');

        Route::post ('/cart/checkout', 'Cart\CartController@checkOut')->name('member.post.check.out');
        Route::get ('/username', 'Member\MemberController@getUserName')->name('get.user.name');

        Route::get('/order/summary', 'Cart\CartController@getOrderSummary')->name('member.get.order.summary');

        Route::post('/order/received', 'Cart\CartController@order_received')->name('member.post.order.received');

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

//        Route::get('/get/food', 'Restaurant\FoodController@getFood')->name('get.food.detail');
    });

});

