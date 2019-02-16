<?php

namespace App\Http\Controllers\Delivery;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Delivery\DeliveryService;

class LoginController extends Controller
{
    private  $deliveryService;

    public function __construct(DeliveryService $deliveryService) {
        $this->deliveryService = $deliveryService;
    }

    public function login (Request $request) {

        $rules = [
            'username' => 'required|string|max:50',
            'password'  =>  'required|string|max:255'
        ];

        $validation = $this->deliveryService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $login = $this->deliveryService->login ($request);

        switch ($login['response_code']) {
            case 200:
                return response()->json ($login);
            case 401:
                return response()->json ($login);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
