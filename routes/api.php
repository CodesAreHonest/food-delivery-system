<?php

use Illuminate\Support\Facades\Route;

Route::prefix('member')->group(function () {

    Route::post('/register', 'Member\RegisterController@register');

    Route::post('/login', 'Member\LoginController@login');

    Route::middleware('member_auth')->group(function () {

        Route::get('/detail', 'Member\MemberController@getDetail')->name('post.member.getDetail');

        Route::post('/update/detail', 'Member\MemberController@updateDetail')->name('post.member.update.detail');

        Route::post('/update/location', 'Member\MemberController@updateLocation')->name('post.member.update.location');

        Route::post('/update/credit/card', 'Member\MemberController@updateCreditCard')->name('post.member.updateCreditCard');

        Route::get('/get/food', 'Restaurant\FoodController@getFood')->name('get.food.detail');

        Route::post('/add/cart', 'Cart\CartController@addCart')->name('member.post.add.cart');

        Route::get('/get/cart', 'Cart\CartController@getCart')->name('member.get.cart');

        Route::post('/cart/checkout', 'Cart\CartController@checkOut')->name('member.post.check.out');

        Route::get('/username', 'Member\MemberController@getUserName')->name('get.user.name');

        Route::get('/order/summary', 'Cart\CartController@getOrderSummary')->name('member.get.order.summary');

        Route::post('/order/received', 'Cart\CartController@order_received')->name('member.post.order.received');

    });

});

Route::prefix('restaurant')->group(function () {

    Route::post('/register', 'Restaurant\RegisterController@register')->name('post.restaurant.register');

    Route::post('/login', 'Restaurant\LoginController@login')->name('post.restaurant.login');

    Route::middleware('restaurant_auth')->group(function () {

        Route::post('/add/food', 'Restaurant\FoodController@addFood');

        Route::post('/add/food/preview', 'Restaurant\FoodController@addFoodPreview');

        Route::post('/update/profile', 'Restaurant\RestaurantController@updateRestaurant')->name('post.update.restaurant');

        Route::get('/detail', 'Restaurant\RestaurantController@getRestaurant')->name('get.restaurant.detail');

        Route::get('/get/food', 'Restaurant\RestaurantController@getFood')->name('get.restaurant.food');

        Route::post('/update/food', 'Restaurant\FoodController@updateFood')->name('update.restaurant.food');

        Route::delete('/delete/food', 'Restaurant\FoodController@deleteFood')->name('delete.restaurant.food');

        Route::get('/food/detail', 'Restaurant\FoodController@getFoodDetail')->name('get.food.detail');

    });

});

Route::prefix('delivery')->group(function () {
    Route::post('/register', 'Delivery\RegisterController@register')->name('post.delivery.register');

    Route::post('/login', 'Delivery\LoginController@login')->name('post.delivery.login');

    Route::middleware('delivery_auth')->group(function () {

        Route::post('/update', 'Delivery\DeliveryController@updateDelivery')->name('post.delivery.update');

        Route::get('/get/detail', 'Delivery\DeliveryController@getDelivery')->name('get.delivery.detail');

        Route::get('/get/delivery/list', 'Cart\CartController@getDeliveryList')->name('get.delivery.list');

        Route::post('/delivery/order/update', 'Cart\CartController@updateDeliveryList')->name('post.delivery.order.update');

    });
});

Route::prefix('admin')->group(function () {

    Route::post('/register', 'Admin\RegisterController@register')->name('post.admin.register');

    Route::post('/login', 'Admin\LoginController@login')->name('post.admin.login');

    Route::middleware('admin_auth')->group(function () {

        Route::get('/get/food/order', 'Cart\CartController@order_food_list')->name('get.admin.food.order');

        Route::get('/list', 'Admin\AdminController@getList')->name('get.admin.list');

        Route::get('/detail', 'Admin\AdminController@getDetail')->name('get.admin.detail');

        Route::post('/update/detail', 'Admin\AdminController@updateDetail')->name('post.admin.update.detail');

        Route::post('/add', 'Admin\AdminController@addAdmin')->name('post.add.admin');
    });

});
