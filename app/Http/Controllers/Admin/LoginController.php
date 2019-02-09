<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Admin\AdminService;

class LoginController extends Controller
{
      private  $adminService;

    public function __construct(AdminService $adminService) {
        $this->middleware('guest:admin')->except('logout');
        $this->adminService = $adminService;
    }

        public function login (Request $request) {

        $rules = [
            'username' => 'required|string|max:50',
            'password'  =>  'required|string|max:255'
        ];

        $validation = $this->adminService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        $login = $this->adminService->login ($request);

        switch ($login['response_code']) {
            case 200:
                return response()->json ($login, 200);
            case 401:
                return response()->json ($login, 401);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
