<?php

namespace App\Http\Controllers\Restaurant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Restaurant\RestaurantService;

class RestaurantController extends Controller
{
    private  $restaurantService;

    public function __construct(RestaurantService $restaurantService) {
        $this->restaurantService = $restaurantService;
    }

    public function updateRestaurant(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
        	'restaurant_id'                 => 'required|string|max:50',
            'restaurant_name'                 => 'required|string|max:100',
            'password'              => 'required|string|min:6|max:255',
           	'confirm_password'      => 'required_with:password|same:password'
        ];

        $validation = $this->restaurantService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        /** ==========================================================================
         *  Update Restaurant Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->restaurantService->updateRestaurant($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail, 404);
            case 500:
                return response()->json ($detail, 500);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

}
