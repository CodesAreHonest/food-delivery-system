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


        $member = Member::where('s_email','=',$request['email'])->get();

        if (!$member) {
            return [
                'response_code' => 500,
                'response_msg'  => 'Internal Server Error',
                'msgType'       => 'error',
                'msgTitle'      => 'Retrieve Unsuccessful',
                'msg'           => ''
            ];
        }

        if (count($member) <= 0) {
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
            'email'         => $member[0]['s_email'],
            'username'      => $member[0]['s_username'],
            'address'      => $member[0]['s_address']
        ];

    }

    public function updateDetail($request) {


        try{
            $member = Member::where('s_email','=',$request['email'])->firstOrFail();
        }catch(ModelNotFoundException $e){
             return [
                'response_code' => 404,
                'response_msg'  => 'No Matched Email',
                'msgType'       => 'error',
                'msgTitle'      => 'Update Unsuccessful',
                'msg'           => ''
            ];
        }

        $member['s_username'] = $request['username'];
        $member['s_address'] = $request['address'];
        $member -> save();

        if (!$member) {
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