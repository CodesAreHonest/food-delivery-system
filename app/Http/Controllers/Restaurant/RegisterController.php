<?php

namespace App\Http\Controllers\Restaurant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Restaurant\RestaurantService;

class RegisterController extends Controller
{
    private  $restaurantService;

    public function __construct(RestaurantService $restaurantService) {
        $this->restaurantService = $restaurantService;
    }

    public function register(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'restaurant_id'         => 'required|string|unique:restaurant,s_restaurant_id|min:3|max:50',
            'restaurant_name'       => 'required|string|max:100',
            'password'              => 'required|string|min:6|max:255',
            'confirm_password'      => 'required_with:password|same:password',
            'register_address'      => 'required|string|max:255'
        ];

        $validation = $this->restaurantService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Restaurant Register
         *  ==========================================================================
         *  @return 200 success
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $register = $this->restaurantService->register($request);

        switch ($register['response_code']) {
            case 200:
                return response()->json ($register);
            case 500:
                return response()->json ($register);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
