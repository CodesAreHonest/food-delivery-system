<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FoodDeliveryController extends Controller
{

    public function index() {
        return view('food_delivery');
    }
}
