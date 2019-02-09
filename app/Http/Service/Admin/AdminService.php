<?php

namespace App\Http\Service\Admin;

use App\Http\Service\BaseService;
use App\Model\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdminService extends BaseService
{
    public function __construct() {}

    public function register($request) {

        $input = [
            's_username'    => $request['username'],
            's_name'       => $request['name'],
            's_password'    => Hash::make($request['password'])
        ];

        $admin = Admin::insert($input);

        if (!$admin) {
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
            's_username' => $request['username'],
            'password' => $request['password']
        ];

        $auth = Auth::guard('admin')->attempt($input);

        if ($auth) {
            return [
                'response_code' => 200,
                'response_msg' => 'success',
                'msgType' => 'success',
                'msgTitle' => 'Admin login success',
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
}