<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Admin\AdminService;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    private  $adminService;

    public function __construct(AdminService $adminService) {
        $this->adminService = $adminService;
    }

    public function login (Request $request) {

        $rules = [
            'login_email'       => 'required|string|max:50',
            'login_password'    =>  'required|string|max:255'
        ];

        $validation = $this->adminService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $login = $this->adminService->login ($request);

        switch ($login['response_code']) {
            case 200:
                return response()->json ($login);
            case 401:
                return response()->json ($login);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function logout () {

        Session::forget('admin_email');

        return redirect()->route('admin.login');
    }
}
