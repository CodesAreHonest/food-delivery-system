<?php

namespace App\Http\Controllers\Cart;

use App\Http\Service\Cart\CartService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    private $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function addCart(Request $request)
    {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         * @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email' => 'required|email|max:100',
            'quantity' => 'required|min:1',
            'food_id' => 'required',
            'food_price' => 'required|numeric|min:0'
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json($validation);
        }

        /** ==========================================================================
         *  Add Cart
         *  ==========================================================================
         * @return 200 success
         * @return 500 internal server error
         *  =========================================================================== */

        $add_cart = $this->cartService->addCart($request);

        return response()->json($add_cart);
    }

    public function getCart(Request $request)
    {

        $getCart = $this->cartService->getCart($request['member_email']);

        return response()->json($getCart);
    }

    public function checkOut(Request $request)
    {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         * @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email' => 'required|email|max:100',
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json($validation);
        }

        /** ==========================================================================
         *  Check Out
         *  ==========================================================================
         * @return 200 Success
         * @return 404 Not Found
         * @return 500 Internal Server Error
         *  =========================================================================== */

        $check_out = $this->cartService->check_out($request['member_email']);

        switch ($check_out['response_code']) {
            case 200:
                return response()->json($check_out);
            case 404:
                return response()->json($check_out);
            case 500:
                return response()->json($check_out);
        }

    }

    public function getOrderSummary(Request $request)
    {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         * @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email' => 'required|email|max:100',
            'delivery_status' => 'nullable|string|max:50',
            'search' => 'nullable|string|max:50',
            'start_date' => 'nullable|date_format:d-m-Y',
            'end_date' => 'nullable|date_format:d-m-Y',
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json($validation);
        }

        $order_summary = $this->cartService->order_summary($request);

        return $order_summary;
    }

    public function order_received(Request $request)
    {

        /** ==========================================================================
         *  Mark order as received
         *  ==========================================================================
         * @return 200 Success
         * @return 500 Internal Server Error
         *  =========================================================================== */

        $order_received = $this->cartService->order_received($request);

        return $order_received;

    }


    public function getDeliveryList()
    {

        $list = $this->cartService->get_delivery_list();

        switch ($list['response_code']) {
            case 200:
                return response()->json($list);
            case 500:
                return response()->json($list);
        }

    }

    public function updateDeliveryList(Request $request)
    {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         * @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'delivery_username' => 'required|string|max:50',
            'order_id' => 'required|int',
            'delivery_status' => 'required|string|max:50',
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json($validation);
        }

        $update_order = $this->cartService->updateDeliveryList($request);

        switch ($update_order['response_code']) {
            case 200:
                return response()->json($update_order);
            case 404:
                return response()->json($update_order);
            case 500:
                return response()->json($update_order);
        }

    }
}

