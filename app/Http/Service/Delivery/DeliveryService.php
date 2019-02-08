<?php

namespace App\Http\Service\Delivery;

use App\Http\Service\BaseService;
use App\Model\Delivery;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DeliveryService extends BaseService
{
    public function __construct() {}

    public function register($request) {

        $input = [
            's_username'    => $request['username'],
            's_name'       => $request['name'],
            's_password'    => Hash::make($request['password']),
            's_address'     => $request['address'],
            's_com_description'     => $request['company_description']
        ];

        $delivery = Delivery::insert($input);

        if (!$delivery) {
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
            's_username' => $request['username'],
            'password' => $request['password']
        ];

        $auth = Auth::guard('delivery')->attempt($input);

        if ($auth) {

            $request->session()->put('delivery_username', $request['username']);

            return [
                'response_code' => 200,
                'response_msg' => 'success',
                'msgType' => 'success',
                'msgTitle' => 'Delivery login success',
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

    public function getDelivery ($request) {

    $delivery = Delivery::where('s_username', $request['delivery_username'])->first();
        if ($delivery) {

            return [
                'response_code' => 200,
                'response_msg'  => 'success',
                'delivery'    => $delivery,
            ];
        }

        return [
            'response_code'     => 404,
            'response_msg'      => 'Not Found'
        ];
    }

    public function updateDelivery($request) 
    {

        $delivery = Delivery::where('s_username', $request['delivery_username'])->first();

        if (!$delivery) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Delivery Username',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $delivery['s_name'] = $request['delivery_name'];
        $delivery['s_address']        = $request['address'];
        $delivery['s_com_description']        = $request['description'];


        $result = $delivery->save();

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
}