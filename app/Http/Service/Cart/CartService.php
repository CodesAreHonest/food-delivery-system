<?php

namespace App\Http\Service\Cart;

use App\Http\Service\BaseService;
use App\Model\ShoppingCart;
use Carbon\Carbon;

class CartService extends BaseService
{
    public function addCart ($request) {

        $total_food_price = $request['quantity'] * $request['food_price'];

        $params = [
            's_food_id'         => $request['food_id'],
            's_member_email'    => $request['member_email'],
            'f_price'           => $request['food_price'],
            'n_quantity'        => $request['quantity'],
            'f_total_price'     => $total_food_price,
            'created_at'        => Carbon::now()->toDateTimeString(),
            'updated_at'        => Carbon::now()->toDateTimeString(),
        ];

        $cart = ShoppingCart::insert($params);

        if ($cart) {

            $cart_info = $this->getCart($request['member_email']);

            return [
                'response_code' => 200,
                'response_msg'  => 'Insert Successful',
                'msgType'       => 'success',
                'msgTitle'      => 'Food add to cart successfully.',
                'msg'           => '',
                'data'          => $cart_info,
            ];
        }

        return [
            'response_code' => 500,
            'response_msg'  => 'Internal Server Error',
            'msgType'       => 'error',
            'msgTitle'      => 'Add Cart Unsuccessful',
            'msg'           => ''
        ];
    }

    public function getCart ($member_email) {

        $cart = ShoppingCart::where('s_member_email', $member_email)
            ->where('b_checked_out', 0)
            ->where('b_paid', 0);

        $cart_amount = $cart->count();

        $data = $cart->get();

        return [
            'cart_details'  => $data,
            'cart_amount'   => $cart_amount
        ];
    }
}