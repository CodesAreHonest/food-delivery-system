<?php

namespace App\Http\Service\Member;

use App\Http\Service\BaseService;
use App\Model\Member;
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
            'data'          => $member,
        ];

    }

    public function updateDetail($request) {

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

        $member['s_username'] = $request['username'];
        $member['s_address']  = $request['address'];
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