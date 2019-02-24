<?php

namespace App\Http\Controllers\Delivery;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Delivery\DeliveryService;

class RegisterController extends Controller
{
  	private  $deliveryService;

    public function __construct(DeliveryService $deliveryService) {
        $this->deliveryService = $deliveryService;
    }

    public function register(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'username'              => 'required|string|unique:delivery,s_username|min:3|max:50',
            'name'                 => 'required|string|max:100',
            'password'              => 'required|string|min:6|max:255',
            'confirm_password'      => 'required_with:password|same:password',
            'address'               => 'required|string|max:255',
            'company_description'   => 'required|string|max:255'
        ];

        $validation = $this->deliveryService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Delivery Register
         *  ==========================================================================
         *  @return 200 success
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $register = $this->deliveryService->register($request);

        switch ($register['response_code']) {
            case 200:
                return response()->json ($register);
            case 500:
                return response()->json ($register);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
