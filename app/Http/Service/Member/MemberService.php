<?php

namespace App\Http\Service\Member;

use App\Http\Service\BaseService;
use App\Model\Member;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class MemberService extends BaseService
{
    public function __construct() {}

    public function register($request) {

        $input = [
            's_username'    => $request['username'],
            's_email'       => $request['email'],
            's_password'    => Hash::make($request['password']),
            's_address'     => $request['address']
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

    public function login ($request) {

        $input = [
            's_email'       => $request['email'],
            'password'      => $request['password']
        ];

        $auth = Auth::guard('member')->attempt($input);

        if ($auth) {
            return [
                'response_code' => 200,
                'response_msg'  => 'success',
                'msgType'       => 'success',
                'msgTitle'      => 'Member login success',
                'msg'           => ''
            ];
        }

        return [
            'response_code' => 401,
            'response_msg'  => 'Unauthenticated',
            'msgType'       => 'error',
            'msgTitle'      => 'Invalid Credential',
            'msg'           => 'Invalid username or password'
        ];
    }
}