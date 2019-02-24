<?php

namespace App\Http\Service\Restaurant;


use App\Http\Service\BaseService;
use App\Model\Food;
use Carbon\Carbon;
use Illuminate\Filesystem\Filesystem;

class FoodService extends BaseService
{
    public function __construct() {}

    public function addFood($request) {

        $image = $request->file('food_image');
        $input['image_name'] = time() . "." . $image->getClientOriginalExtension();
        $destination_path = public_path('/images');
        $image->move($destination_path, $input['image_name']);

        $params = [
            's_name'            => $request['food_name'],
            'f_price'           => $request['food_price'],
            's_category'        => $request['food_category'],
            's_image'           => "/images/{$input['image_name']}",
            's_description'     => $request['food_description'],
            's_restaurant_id'   => $request['restaurant_id'],
            'created_at'        => Carbon::now()->toDateTimeString(),
            'updated_at'        => Carbon::now()->toDateTimeString(),
        ];

        $food = Food::insert($params);

        if ($food) {

            return [
                'response_code' => 200,
                'response_msg'  => 'Record Saved Successfully.',
                'msgType'       => 'success',
                'msgTitle'      => 'Food Information Uploaded Successfully.',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 500,
            'response_msg'  => 'Record Saved Failed',
            'msgType'       => 'error',
            'msgTitle'      => 'Food uploaded failed.',
            'msg'           => ''
        ];

    }

    public function addFoodPreview ($request) {

        $image = $request->file('food_image');
        $input['image_name'] = "food_preview." . $image->getClientOriginalExtension();
        $destination_path = public_path('/preview');
        $image->move($destination_path, $input['image_name']);

        if ($image) {

            $file = new Filesystem;
            $file->cleanDirectory('resources/js/images/preview');

            return [
                'response_code' => 200,
                'response_msg'  => 'Food Image Import Saved Successfully.',
                'msgType'       => 'success',
                'msgTitle'      => 'Food Image Uploaded Successfully.',
                'msg'           => '',
                'data'          => "preview/" . $input['image_name'],
            ];

        }

        return [
            'response_code' => 500,
            'response_msg'  => 'Record Saved Failed',
            'msgType'       => 'error',
            'msgTitle'      => 'Food Image uploaded failed.',
            'msg'           => ''
        ];


    }

    public function getFood($request) {

        $food = Food::orderBy('created_at', 'desc');

        if ($request->has('restaurant_id')) {
            if ($request['restaurant_id'] != '') {
                $food->where('s_restaurant_id', $request['restaurant_id']);
            }
        }

        if ($request->has('category')) {
            if ($request['category'] !== 'all') {
                $food->where('s_category', $request['category']);
            }
        }

        if ($request->has('search_text')) {
            if ($request['search_text'] != '') {
                $food->where('s_name', 'LIKE', "%{$request['search_text']}%");
            }
        }

        $result = $food->paginate($request['limit']);

        return [
            'response_code' => 200,
            'response_msg'  => 'Retrieve Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Retrieve Successful',
            'msg'           => '',
            'food_list'     => $result
        ];
    }

    public function updateFood ($request) {
        
        $food = Food::where('s_restaurant_id', $request['s_restaurant_id'])
            ->where('food_id', $request['food_id'])
            ->first();

        $params = [
            's_name'            => $request['food_name'],
            'f_price'           => $request['food_price'],
            's_category'        => $request['food_category'],
            's_description'     => $request['food_description'],
            'updated_at'        => Carbon::now()->toDateTimeString(),
        ];

        if ($request->has('food_image')) {

            $image = $request->file('food_image');
            $input['image_name'] = time() . "." . $image->getClientOriginalExtension();
            $destination_path = public_path('/images');
            $image->move($destination_path, $input['image_name']);

            $params['s_image'] = "/images/{$input['image_name']}";
        }

        $result = $food->update($params);

        if ($result) {

            return [
                'response_code' => 200,
                'response_msg'  => 'Record Updated Successfully.',
                'msgType'       => 'success',
                'msgTitle'      => 'Food Information Updated Successfully.',
                'msg'           => ''
            ];
    
            return [
                'response_code' => 500,
                'response_msg'  => 'Record Updated Failed',
                'msgType'       => 'error',
                'msgTitle'      => 'Food Information Updated Failed.',
                'msg'           => ''
            ];

        }

    }

    public function deleteFood ($request) {

        $food = Food::where('s_restaurant_id', $request['s_restaurant_id'])
            ->where('food_id', $request['food_id'])
            ->first();

        $deleteFood = $food->delete();

        if ($deleteFood) {

            return [
                'response_code' => 200,
                'response_msg'  => 'Record Deleted Successfully.',
                'msgType'       => 'success',
                'msgTitle'      => 'Food Information Deleted Successfully.',
                'msg'           => ''
            ];
    
            return [
                'response_code' => 500,
                'response_msg'  => 'Record Deleted Failed',
                'msgType'       => 'error',
                'msgTitle'      => 'Food Information Deleted Failed.',
                'msg'           => ''
            ];
        }
        
    }
}