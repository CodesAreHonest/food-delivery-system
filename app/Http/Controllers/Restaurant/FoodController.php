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
            'food_price'    => 'required|numeric|min:0',
            'food_category' => 'required|string|max:50',
            'food_image'    => 'required|mimes:jpeg,png,jpg,gif,svg|max:5120000',
            'food_description'  => 'required|string|max:255',
        ];

        $validation = $this->foodService->validator ($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        $add_food = $this->foodService->addFood($request);

        switch ($add_food['response_code']) {
            case 200:
                return response()->json ($add_food, 200);
            case 500:
                return response()->json ($add_food, 500);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
