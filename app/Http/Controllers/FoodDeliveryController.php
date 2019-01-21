<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FoodDeliveryController extends Controller
{
    public function __construct() {}

    public function index() {
        return view('food_delivery');
    }
}
