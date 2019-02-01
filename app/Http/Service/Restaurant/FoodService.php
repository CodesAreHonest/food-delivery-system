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
            's_image'           => "{$request->getSchemeAndHttpHost()}/{$input['image_name']}",
            's_description'     => $request['food_description'],
            's_restaurant_id'   => 1,
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
}