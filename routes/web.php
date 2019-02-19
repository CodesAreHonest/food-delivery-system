<?php

use Illuminate\Support\Facades\Route;


Route::prefix('member')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('member.login');
    Route::get('/logout', 'Member\MemberController@logout')->name('post.member.logout');

    Route::middleware('member_auth')->group(function() {

        Route::get('/', 'FoodDeliveryController@index')->name('member.home');

        // Edit Profile and Location Information
        Route::get('/manage/account', 'FoodDeliveryController@index')->name('member.manage.account');
        Route::get('/location/information', 'FoodDeliveryController@index')->name('restaurant.location.information');

        Route::get('/credit/card', 'FoodDeliveryController@index')->name('member.credit.card');

        Route::get('/cart', 'FoodDeliveryController@index')->name('member.credit.card');

        Route::get('/order/history', 'FoodDeliveryController@index')->name('member.order.history');

    });
});

Route::prefix('restaurant')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('restaurant.login');
    Route::get('/logout', 'Restaurant\RestaurantController@logout')->name('post.restaurant.logout');

    Route::group(['middleware' => 'restaurant_auth'], function() {

        Route::get('/', 'FoodDeliveryController@index')->name('restaurant.home');

        // Edit Profile
        Route::get('/manage/account', 'FoodDeliveryController@index')->name('restaurant.manage.account');

        Route::get('/delivery/list', 'FoodDeliveryController@index')->name('restaurant.delivery.list');
        Route::get('/delivery/team', 'FoodDeliveryController@index')->name('restaurant.delivery.team');
    });

});

Route::prefix('delivery')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('delivery.login');
    Route::get('/logout', 'Delivery\DeliveryController@logout')->name('post.delivery.logout');

    Route::group(['middleware' => 'delivery_auth'], function() {

        Route::get('/', 'FoodDeliveryController@index')->name('delivery.home');

        // Edit Profile
        Route::get('/manage/account', 'FoodDeliveryController@index')->name('delivery.manage.account');
    });

});

Route::prefix('admin')->group(function() {

    Route::get('/login', 'FoodDeliveryController@index')->name('admin.login');
    Route::get('/logout', 'Admin\LoginController@logout')->name('post.admin.logout');

    Route::group(['middleware' => 'admin_auth'], function() {

        Route::get('/', 'FoodDeliveryController@index')->name('delivery.home');

        // Edit Profile
        Route::get('/management', 'FoodDeliveryController@index')->name('admin.manage.account');
        Route::get('/add','FoodDeliveryController@index')->name('admin.add.account');
    });

});

Route::get('/', 'FoodDeliveryController@index')->name('system.home');