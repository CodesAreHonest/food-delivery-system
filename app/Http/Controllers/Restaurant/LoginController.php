<?php

namespace App\Http\Controllers\Restaurant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Restaurant\RestaurantService;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    private  $restaurantService;

    public function __construct(RestaurantService $restaurantService) {
        $this->middleware('guest:restaurant')->except('logout');
        $this->restaurantService = $restaurantService;
    }

    public function login (Request $request) {

        $rules = [
            'restaurant_id' => 'required|string|max:50',
            'password'  =>  'required|string|max:255'
        ];

        $validation = $this->restaurantService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $login = $this->restaurantService->login ($request);

        switch ($login['response_code']) {
            case 200:
                return response()->json ($login);
            case 401:
                return response()->json ($login);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
