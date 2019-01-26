<?php

namespace App\Http\Service\Restaurant;

use App\Http\Service\BaseService;
use App\Model\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RestaurantService extends BaseService
{
    public function __construct() {}

    public function register($request) {

        $input = [
            's_restaurant_id'    => $request['restaurant_id'],
            's_restaurant_name'       => $request['restaurant_name'],
            's_password'    => Hash::make($request['password']),
            's_address'     => $request['address']
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
}