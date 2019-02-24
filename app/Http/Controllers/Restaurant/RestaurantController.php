<?php

namespace App\Http\Controllers\Restaurant;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Restaurant\RestaurantService;
use App\Http\Service\Restaurant\FoodService;
use Illuminate\Support\Facades\Session;

class RestaurantController extends Controller
{
    private  $restaurantService;
    private  $foodService;

    public function __construct(RestaurantService $restaurantService, FoodService $foodService) {
        $this->restaurantService = $restaurantService;
        $this->foodService = $foodService;
    }

    public function updateRestaurant(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
        	'restaurant_id'         => 'required|string|max:50',
            'restaurant_name'       => 'required|string|max:100',
            'address'               => 'required|string|max:100',
        ];

        $validation = $this->restaurantService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
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
                return response()->json ($detail);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function getRestaurant (Request $request) {


        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'restaurant_id'         => 'required|string|max:50',
        ];

        $validation = $this->restaurantService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        $restaurant = $this->restaurantService->getRestaurant($request);

        switch ($restaurant['response_code']) {
            case 200:
                return response()->json ($restaurant);
            case 404:
                return response()->json ($restaurant);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function getFood (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'restaurant_id'            => 'required|string|max:50',
            'page'                     => 'required|numeric|min:1',
            'limit'                    => 'required|numeric|min:1',
            'category'                 => 'nullable|string|max:100',
            'search_text'              => 'nullable|string|max:100'
        ];

        $validation = $this->restaurantService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        /** ==========================================================================
         *  Get food detail based on filter criteria and restaurant id
         *  ==========================================================================
         *  @return 200 Success
         *  =========================================================================== */

        $getFood = $this->foodService->getFood($request);

        return $getFood;

    }

    public function logout() {

        Session::forget('restaurant_id');

        return redirect()->route('restaurant.login');
    }

}
