<?php

namespace App\Http\Controllers\Cart;

use App\Http\Service\Cart\CartService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    private $cartService;

    public function __construct(CartService $cartService) {
        $this->cartService = $cartService;
    }
    public function addCart (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'              => 'required|email|max:100',
            'quantity'                  => 'required|min:1',
            'food_id'                   => 'required',
            'food_price'                => 'required|numeric|min:0'
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Add Cart
         *  ==========================================================================
         *  @return 200 success
         *  @return 500 internal server error
         *  =========================================================================== */

        $add_cart = $this->cartService->addCart($request);

        return response()->json ($add_cart);
    }

    public function getCart (Request $request) {

        $getCart = $this->cartService->getCart($request['member_email']);

        return response()->json ($getCart);
    }

    public function checkOut (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'              => 'required|email|max:100',
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Check Out
         *  ==========================================================================
         *  @return 200 Success
         *  @return 404 Not Found
         *  @return 500 Internal Server Error
         *  =========================================================================== */

        $check_out = $this->cartService->check_out($request['member_email']);

        switch ($check_out['response_code']) {
            case 200:
                return response()->json ($check_out);
            case 404:
                return response()->json ($check_out);
            case 500:
                return response()->json ($check_out);
        }

    }

    public function getOrderSummary (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'              => 'required|email|max:100',
            'delivery_status'           => 'nullable|string|max:50',
            'search'                    => 'nullable|string|max:50',
            'start_date'                => 'nullable|date|format:d-m-Y',
            'end_date'                  => 'nullable|date|format:d-m-Y',
        ];

        $validation = $this->cartService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $order_summary = $this->cartService->order_summary($request);

        return $order_summary;
    }
}
