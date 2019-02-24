<?php

namespace App\Http\Service\Restaurant;

use App\Http\Service\BaseService;
use App\Model\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RestaurantService extends BaseService
{
    public function __construct() {}

    public function register($request) {


        $input = [
            's_restaurant_id'           => $request['restaurant_id'],
            's_restaurant_name'         => $request['restaurant_name'],
            's_password'                => Hash::make($request['password']),
            's_address'                 => $request['register_address']
        ];

        $restaurant = Restaurant::insert($input);

        if (!$restaurant) {
            return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
                'msgTitle'      => 'Register Unsuccessful',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 200,
            'response_msg'  => 'Register Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Register Successful',
            'msg'           => ''
        ];
    }

    public function login ($request)
    {

        $input = [
            's_restaurant_id' => $request['restaurant_id'],
            'password' => $request['password']
        ];

        $auth = Auth::guard('restaurant')->attempt($input);

        if ($auth) {

            $request->session()->put('restaurant_id', $request['restaurant_id']);

            return [
                'response_code' => 200,
                'response_msg' => 'success',
                'msgType' => 'success',
                'msgTitle' => 'Member login success',
                'msg' => ''
            ];
        }

        return [
            'response_code' => 401,
            'response_msg' => 'Unauthenticated',
            'msgType' => 'error',
            'msgTitle' => 'Invalid Credential',
            'msg' => 'Invalid username or password'
        ];
    }

    public function updateRestaurant($request) 
    {

        $restaurant = Restaurant::where('s_restaurant_id', $request['restaurant_id'])->first();

        if (!$restaurant) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Restaurant Id',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $restaurant['s_restaurant_name'] = $request['restaurant_name'];
        $restaurant['s_address']        = $request['address'];

        $result = $restaurant->save();

        if (!$result) {
            return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 200,
            'response_msg'  => 'Update Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Update Successful',
            'msg'           => ''
        ];
    }

    public function getRestaurant ($request) {

        $restaurant = Restaurant::where('s_restaurant_id', $request['restaurant_id'])->first();

        if ($restaurant) {

            return [
                'response_code' => 200,
                'response_msg'  => 'success',
                'restaurant'    => $restaurant,
            ];
        }

        return [
            'response_code'     => 404,
            'response_msg'      => 'Not Found'
        ];
    }
}