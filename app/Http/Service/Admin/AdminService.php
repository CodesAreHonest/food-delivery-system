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
            's_email'        => $request['email'],
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
            's_email'       => $request['login_email'],
            'password'    => $request['login_password']
        ];

        $auth = Auth::guard('admin')->attempt($input);

        if ($auth) {

            $request->session()->put('admin_email', $request['login_email']);


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

    public function getList ($request) {

        $query = Admin::orderBy('created_at', 'desc');

        if ($request->has('user_id')) {
            $query = $query->where('s_username', 'LIKE', "%{$request['user_id']}%");
        }

        $data = $query->paginate($request['limit']);

        return [
            'response_code' => 200,
            'response_msg'  => 'Retrieve Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Retrieve Successful',
            'msg'           => '',
            'admin_list'    => $data
        ];
    }

    public function getDetail ($request) {

        $data = Admin::where('s_email', $request['admin_email'])
            ->first();

        return [
            'response_code' => 200,
            'response_msg'  => 'Retrieve Successful',
            'msgType'       => 'success',
            'msgTitle'      => 'Retrieve Successful',
            'msg'           => '',
            'admin_detail'    => $data
        ];
    }

    public function updateDetail ($request) {

        $admin = Admin::where('s_email', $request['admin_email'])
            ->first();

        $admin->s_username = $request['username'];
        $admin->s_password = Hash::make($request['password']);

        $result            = $admin->save();

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