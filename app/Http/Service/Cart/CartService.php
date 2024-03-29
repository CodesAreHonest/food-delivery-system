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
            DB::raw('s_delivery_fee'),
        ];

        $sum = ShoppingCart::join('food', 'shopping_cart.s_food_id', '=', 'food.id')
            ->join('restaurant', 'restaurant.s_restaurant_id', '=', 'food.s_restaurant_id')
            ->where('s_member_email', $member_email)
            ->where('b_paid', 0)
            ->select($sum_columns)
            ->groupBy('s_delivery_fee', 'food.s_restaurant_id')
            ->get();

        $data = $cart->select($columns)->get();

        $cart_total_price = 0;
        $delivery_fee = 0;

        if ($sum) {
            foreach ($sum as $value) {
                $cart_total_price += $value['cart_total_price'];
                $delivery_fee += $value['s_delivery_fee'];
            }
        }

        return [
            'cart_amount'               => $cart_amount,
            'cart_total_fee'            => number_format($cart_total_price, 2),
            'cart_total_delivery_fee'   => number_format($delivery_fee,2 ),
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

    public function order_summary ($request) {

        $columns = [
            'shopping_cart.id',
            's_restaurant_name',
            's_image',
            'food.s_name',
            'dt_paid',
            DB::raw('sum(n_quantity) as total_quantity'),
            's_delivery_status'
        ];

        $query = ShoppingCart::join('food', 'shopping_cart.s_food_id', '=', 'food.id')
            ->join('restaurant', 'restaurant.s_restaurant_id', '=', 'food.s_restaurant_id')
            ->where('s_member_email', $request['member_email'])
            ->where('b_paid', 1);

        if ($request->has('delivery_status')) {
            if ($request['delivery_status'] != 'all') {
                $query = $query->where('s_delivery_status',  $request['delivery_status']);
            }
        }

        if ($request->has('search')) {
            if ($request['search'] != '') {
                $query = $query->where('s_restaurant_name', 'LIKE', "%{$request['search']}%");
            }
        }

        if ($request->has('start_date')) {

            if ($request['start_date'] != '') {
                $start_date = Carbon::parse($request['start_date'])->startOfDay()->toDateTimeString();
                $query = $query->where('dt_paid', '>=', $start_date);
            }
        }

        if ($request->has('end_date')) {

            if ($request['end_date'] != '') {
                $end_date = Carbon::parse($request['end_date'])->endOfDay()->toDateTimeString();
                $query = $query->where('dt_paid', '<=', $end_date);
            }
        }

        $data = $query->select($columns)
            ->groupBy('s_image', 'food.s_name', 's_delivery_status')
            ->get();

        return $data;
    }

    public function order_received ($request) {

        $delivered_items = ShoppingCart::where('id', $request['item_id'])
            ->where('s_delivery_status', 'shipped')
            ->whereNotNull('s_delivery_id')
            ->first();

        if (!$delivered_items) {
            return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
                'msgTitle'      => 'Delivered item not found. ',
                'msg'           => ''
            ];
        }

        $delivered_items->s_delivery_status = 'delivered';
        $delivered_items->dt_delivery_delivered = Carbon::now()->toDateTimeString();
        $delivered_items->save();

        if ($delivered_items) {
            return [
                'response_code' => 200,
                'response_msg'  => 'Success',
                'msgType'       => 'success',
                'msgTitle'      => 'Food delivered is mark as Delivered. ',
                'msg'           => ''
            ];
        }

        return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
            'msgTitle'      => 'Internal Server Error',
            'msg'           => ''
        ];

    }

    public function get_delivery_list(){
        $columns = [
            'shopping_cart.n_quantity',
            'shopping_cart.id',
            'shopping_cart.s_delivery_status',
            'food.s_name',
            'member.s_address'
        ];

        $list = ShoppingCart::join('food','shopping_cart.s_food_id','=','food.id')
        ->join('member','shopping_cart.s_member_email','=','member.s_email')
        ->where('b_paid',1)
        ->select($columns);

        $delivery_list_count = $list->count();

        $data = $list->get();

        if ($data) {
            return [
                'response_code' => 200,
                'msgType'       => 'success',
                'msgTitle'      => 'get Delivery List Success successfully.',
                'msg'           => '',
                'delivery_list' => $data,
                'total_count' =>    $delivery_list_count        
            ];
        }

        return [
            'response_code' => 500,
            'response_msg'  => 'Internal Server Error',
            'msgType'       => 'error',
            'msgTitle'      => 'get Data Unsuccessful Unsuccessful',
            'msg'           => ''
        ];

    }

    public function updateDeliveryList($request) 
    {

        $order = ShoppingCart::where('id', $request['order_id'])->first();

        if (!$order) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched order Id',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $order['s_delivery_status']     = $request['delivery_status'];
        $order['s_delivery_id']         = $request['delivery_username'];
        $order['dt_delivery_shipped']   = Carbon::now()->toDateTimeString();


        $result = $order->save();

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

    public function foodOrderList ($request) {

        $columns = [
            'shopping_cart.id',
            'shopping_cart.created_at',
            's_username',
            's_email',
            's_country',
            's_name',
            's_category',
            'n_quantity',
            'f_total_price',
            's_delivery_status',
            's_delivery_id',
            's_delivery_fee'
        ];

        $query = ShoppingCart::join('food','shopping_cart.s_food_id','=','food.id')
            ->join('member','shopping_cart.s_member_email','=','member.s_email')
            ->whereNotNull('s_delivery_status')
            ->orderBy('shopping_cart.created_at', 'desc')
            ->select($columns);

        if ($request->has('id')) {
            if ($request['id'] != '') {
                $query = $query->where('shopping_cart.id', $request['id']);
            }
        }

        if ($request->has('user_email')) {
            if ($request['user_email'] != '') {
                $query = $query->where('s_member_email', 'LIKE', "%{$request['user_email']}%");
            }
        }

        if ($request->has('order_status')) {
            if ($request['order_status'] != 'all') {
                $query = $query->where('s_delivery_status', $request['order_status']);
            }
        }

        if ($request->has('start_date')) {
            if ($request['start_date'] != '') {
                $start_date = Carbon::parse($request['start_date'])->startOfDay()->toDateTimeString();
                $query = $query->where('shopping_cart.created_at', '>=', $start_date);
            }
        }

        if ($request->has('end_date')) {
            if ($request['end_date'] != '') {
                $end_date = Carbon::parse($request['end_date'])->endOfDay()->toDateTimeString();
                $query = $query->where('shopping_cart.created_at', '<=', $end_date);
            }
        }

        $data = $query->paginate($request['limit']);

        return [
            'response_code' => 200,
            'response_msg'  => 'Retrieve Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Retrieve Successful',
            'msg'           => '',
            'data'          => $data
        ];

    }
}