<?php

namespace App\Http\Service\Cart;

use App\Http\Service\BaseService;
use App\Model\Member;
use App\Model\ShoppingCart;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

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

        $columns = [
            'n_quantity',
            'shopping_cart.f_price',
            'f_total_price',
            's_name',
            's_image',
            'restaurant.s_restaurant_name',
            's_delivery_fee'
        ];

        $cart = ShoppingCart::join('food', 'shopping_cart.s_food_id', '=', 'food.id')
            ->join('restaurant', 'restaurant.s_restaurant_id', '=', 'food.s_restaurant_id')
            ->where('s_member_email', $member_email)
            ->where('b_paid', 0);

        $cart_amount = $cart->count();

        $sum_columns = [
            DB::raw('sum(f_total_price) as cart_total_price'),
            DB::raw('sum(s_delivery_fee) as total_delivery_fee'),
        ];

        $sum = ShoppingCart::join('food', 'shopping_cart.s_food_id', '=', 'food.id')
            ->join('restaurant', 'restaurant.s_restaurant_id', '=', 'food.s_restaurant_id')
            ->where('s_member_email', $member_email)
            ->where('b_paid', 0)
            ->select($sum_columns)->first();

        $data = $cart->select($columns)->get();

        return [
            'cart_amount'               => $cart_amount,
            'cart_total_fee'            => $sum['cart_total_price'],
            'cart_total_delivery_fee'   => $sum['total_delivery_fee'],
            'cart_details'              => $data,
        ];
    }

    public function check_out ($member_email) {

        $credit_card_availability = Member::check_credit_card ($member_email);

        if (!$credit_card_availability) {
            return [
                'response_code' => 404,
                'response_msg'  => 'Not Found',
                'msgType'       => 'error',
                'msgTitle'      => 'Credit Card Information not found.',
                'msg'           => 'Please update your credit card information. '
            ];
        }

        $check_out = ShoppingCart::where('b_paid', 0)
            ->where('s_member_email', $member_email)
            ->update([
                'b_paid'            => 1,
                'dt_paid'           => Carbon::now()->toDateTimeString(),
                's_delivery_status' => 'paid'
            ]);

        if ($check_out) {
            return [
                'response_code' => 200,
                'response_msg'  => 'Success',
                'msgType'       => 'success',
                'msgTitle'      => 'Food Check Out successfully.',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 500,
            'response_msg'  => 'Internal Server Error',
            'msgType'       => 'error',
            'msgTitle'      => 'Check Out Unsuccessful',
            'msg'           => ''
        ];
    }
}