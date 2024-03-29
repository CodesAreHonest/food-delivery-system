<?php

namespace App\Http\Service\Member;

use App\Http\Service\BaseService;
use App\Model\Member;
use App\Model\ShoppingCart;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MemberService extends BaseService
{
    public function __construct() {}

    public function register($request) {

        $input = [
            's_username'    => $request['register_username'],
            's_email'       => $request['register_email'],
            's_password'    => Hash::make($request['register_password']),
            's_address'     => $request['register_address'],
            's_city'        => $request['register_city'],
            's_state'       => $request['register_state'],
            's_country'     => $request['register_country'],
            'created_at'    => Carbon::now()->toDateTimeString(),
            'updated_at'    => Carbon::now()->toDateTimeString(),
            's_status'    => '1',
        ];

        $member = Member::insert($input);

        if (!$member) {
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
            's_email' => $request['email'],
            'password' => $request['password']
        ];

        $auth = Auth::guard('member')->attempt($input);

        if ($auth) {

            $request->session()->put('member_email', $request['email']);

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

    public function getDetail($request) {


        $member = Member::where('s_email', $request['member_email'])->first();

        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Retrieve Unsuccessful',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 200,
            'response_msg'  => 'Retrieve Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Retrieve Successful',
            'msg'           => '',
            'member_detail' => $member
        ];

    }

    public function updateDetail($request) {

        $member = Member::where('s_email', $request['member_email'])->first();

        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $params['s_username'] = $request['username'];
        $params['s_password'] = Hash::make($request['password']);

        $result = $member->update($params);

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

    public function updateCreditCard($request) {

        $member = Member::where('s_email', $request['member_email'])->first();

        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $member->s_card_name        = $request['card_name'];
        $member->s_card_number      = $request['card_number'];
        $member->s_expired_date     = $request['card_expired_date'];
        $member->n_cvc              = $request['cvc'];

        $result = $member->save();

        if (!$result) {

            return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => '',
                'card_updated'  => false,
            ];
        }

        Member::where('s_email', $request['member_email'])
            ->update(['b_card_information' => 1]);

        return [
            'response_code' => 200,
            'response_msg'  => 'Update Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Update Successful',
            'msg'           => '',
            'card_updated'  => true,
        ];
    }

    public function updateLocation ($request) {

        $member = Member::where('s_email', $request['member_email'])->first();

        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'Data not found',
                'msgType'       => 'error',
                'msgTitle'      => 'Member data not found',
                'msg'           => ''
            ];
        }

        $params = [
            's_address'     => $request['address'],
            's_city'        => $request['city'],
            's_state'       => $request['state'],
            's_country'     => $request['country'],
        ];

        $result = $member->update($params);

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

    public function updateBlockUser($request) {

        $member = Member::where('s_email', $request['member_email'])->first();


        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => 'Update Unsuccessful'
            ];
        }

        if ($member['s_status'] === 1) {
            $member['s_status'] = 0;
        }else{
            $member['s_status'] = 1;
        }


        $result = $member->save();

        if (!$result) {
            return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => 'Update Unsuccessful'
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


    public function check_out ($member_email) {

        $credit_card_availability = Member::check_credit_card ($member_email);

        if (!$credit_card_availability) {
            return [
                'response_code' => 404,
                'response_msg'  => 'Not Found',
                'msgType'       => 'error',
                'msgTitle'      => 'Credit Card Information not found.',
                'msg'           => ''
            ];
        }
        $check_out = ShoppingCart::where('b_paid', 0)
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
        return[
            'response_code' => 500,
            'response_msg'  => 'Internal Server Error',
            'msgType'       => 'error',
            'msgTitle'      => 'Check Out Unsuccessful',
            'msg'           => ''
        ];
    }
}