<?php

namespace App\Http\Controllers\Delivery;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Delivery\DeliveryService;
use Illuminate\Support\Facades\Session;

class DeliveryController extends Controller
{
      private  $deliveryService;

    public function __construct(DeliveryService $deliveryService) {
        $this->deliveryService = $deliveryService;
    }

    public function updateDelivery(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
        	'delivery_username'         => 'required|string|max:50',
            'delivery_name'       => 'required|string|max:100',
            'address'               => 'required|string|max:255',
            'description'               => 'required|string|max:255',
        ];

        $validation = $this->deliveryService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Update Delivery Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->deliveryService->updateDelivery($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail);
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

    public function getDelivery (Request $request) {


        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'delivery_username'         => 'required|string|max:50',
        ];

        $validation = $this->deliveryService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        $delivery = $this->deliveryService->getDelivery($request);

        switch ($delivery['response_code']) {
            case 200:
                return response()->json ($delivery);
            case 404:
                return response()->json ($delivery);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function logout() {

        Session::forget('delivery_username');

        return redirect()->route('delivery.login');
    }
}
