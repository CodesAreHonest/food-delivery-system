<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Service\Restaurant\FoodService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FoodController extends Controller
{
    private $foodService;

    public function __construct(FoodService $foodService) {
        $this->foodService = $foodService;
    }

    public function addFood(Request $request) {

        $rules = [
            'food_name'     => 'required|string|max:255',
            'food_price'    => 'required|numeric|min:1',
            'food_category' => 'required|string|max:50',
            'food_image'    => 'required|mimes:jpeg,png,jpg,gif,svg|max:5120000',
            'food_description'  => 'required|string|max:255',
        ];

        $validation = $this->foodService->validator ($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $add_food = $this->foodService->addFood($request);

        switch ($add_food['response_code']) {
            case 200:
                return response()->json ($add_food);
            case 500:
                return response()->json ($add_food);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function addFoodPreview (Request $request) {

        $rules = [
            'food_image'    => 'required|mimes:jpeg,png,jpg,gif,svg|max:5120000',
        ];

        $validation = $this->foodService->validator ($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $addFoodPreview = $this->foodService->addFoodPreview($request);

        switch ($addFoodPreview['response_code']) {
            case 200:
                return response()->json ($addFoodPreview);
            case 500:
                return response()->json ($addFoodPreview);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }

    }

    public function getFood(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'page'                     => 'required|numeric|min:1',
            'limit'                    => 'required|numeric|min:1',
            'category'                 => 'nullable|string|max:100',
            'search_text'              => 'nullable|string|max:100',
        ];

        $validation = $this->foodService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Get Food
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->foodService->getFood($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
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

    public function updateFood (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'restaurant_id'     => 'required|string|max:100',
            'food_id'           => 'required|integer',
            'food_name'         => 'required|string|max:255',
            'food_price'        => 'required|numeric|min:1',
            'food_category'     => 'required|string|max:50',
            'food_image'        => 'required|mimes:jpeg,png,jpg,gif,svg|max:5120000',
            'food_description'  => 'required|string|max:255',
        ];

        $validation = $this->foodService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Update Food based on Payloads
         *  ==========================================================================
         *  @return 200 Success
         *  @return 500 Internal Server Error
         *  =========================================================================== */

        $updateFood = $this->foodService->updateFood($request);

        return $updateFood;
    }

    public function deleteFood (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'restaurant_id'     => 'required|string|max:100',
            'food_id'           => 'required|integer',
        ];

        $validation = $this->foodService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Delete Food
         *  ==========================================================================
         *  @return 200 Success
         *  @return 500 Internal Server Error
         *  =========================================================================== */

        $deleteFood = $this->foodService->deleteFood($request);

        return $deleteFood;

    }
}
