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
            's_image'           => "image/{$input['image_name']}",
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

        if ($request->has(['category']) AND $request->has(['search_text'])) {
            $food = Food::where('s_restaurant_id', $request['restaurant_id'])
                ->where('s_category',$request['category'])
                ->where('s_name','LIKE', '%'.$request['search_text'].'%')
                ->orderBy($request['order_by'])
                ->paginate(8);
        }else if ($request->has(['category'])) {
            $food = Food::where('s_restaurant_id', $request['restaurant_id'])
                ->where('s_category',$request['category'])
                ->orderBy($request['order_by'])
                ->paginate(8);
        }elseif($request->has(['search_text'])){
            $food = Food::where('s_restaurant_id', $request['restaurant_id'])
                ->where('s_name','LIKE', '%'.$request['search_text'].'%')
                ->orderBy($request['order_by'])
                ->paginate(8);
        }else{
            $food = Food::where('s_restaurant_id', $request['restaurant_id'])
                    ->orderBy($request['order_by'])
                    ->paginate(8);
        }

        if (!$food) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Retrieve Unsuccessful',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 200,
            'response_msg'  => 'Retrieve Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Retrieve Successful',
            'msg'           => '',
            'food_list'          => $food
        ];

    }
}