<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Service\Admin\AdminService;

class RegisterController extends Controller
{
    private  $adminService;

    public function __construct(AdminService $adminService) {
        $this->adminService = $adminService;
    }

    public function register(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'username'              => 'required|string|unique:admin,s_username|max:50',
            'name'                 => 'required|string|max:100',
            'password'              => 'required|string|min:6|max:255',
            'confirm_password'      => 'required_with:password|same:password'
        ];

        $validation = $this->adminService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        /** ==========================================================================
         *  Admin Register
         *  ==========================================================================
         *  @return 200 success
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $register = $this->adminService->register($request);

        switch ($register['response_code']) {
            case 200:
                return response()->json ($register,200);
            case 500:
                return response()->json ($register, 500);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
