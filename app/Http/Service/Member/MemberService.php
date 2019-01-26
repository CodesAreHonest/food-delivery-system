<?php

namespace App\Http\Service\Member;

use App\Http\Service\BaseService;
use App\Model\Member;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MemberService extends BaseService
{
    public function __construct() {}

    public function register($request) {

        $input = [
            's_username'    => $request['username'],
            's_email'       => $request['email'],
            's_password'    => Hash::make($request['password']),
            's_address'     => $request['address'],
            'created_at'    => Carbon::now()->toDateTimeString(),
            'updated_at'    => Carbon::now()->toDateTimeString(),
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


        $member = Member::where('s_email', $request['email'])->first();

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
            'card_name'          => $member
        ];

    }

    public function updateDetail($request) {

        $member = Member::where('s_email', $request['email'])->first();

        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $member['s_username'] = $request['username'];
        $member['s_address']  = $request['address'];
        $member['s_city']  = $request['city'];
        $member['s_state']  = $request['state'];
        $member['s_country']  = $request['country'];

        $result = $member->save();

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

        $member = Member::where('s_email', $request['email'])->first();

        if (!$member) {
            return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $member['s_card_name']      = $request['card_name'];
        $member['s_card_number']    = $request['card_number'];
        $member['s_expired_date']   = $request['card_expired_date'];
        $member['n_cvc']            = $request['cvc'];
        $member['created_at']       = Carbon::now()->toDateTimeString();
        $member['updated_at']       = Carbon::now()->toDateTimeString();

        $result = $member->save();

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