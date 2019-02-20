<?php

namespace App\Http\Controllers\Admin;

use App\Http\Service\Admin\AdminService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    private $adminService;

    public function __construct(AdminService $adminService) {
        $this->adminService = $adminService;
    }

    public function getList (Request $request) {

        $rules = [
            'user_id'           => 'nullable|string|max:50',
        ];

        $validation = $this->adminService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $admin = $this->adminService->getList ($request);

        return $admin;
    }

    public function getDetail (Request $request) {

        $rules = [
            'admin_email'        => 'required|string|max:50',
        ];

        $validation = $this->adminService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $admin = $this->adminService->getDetail ($request);

        return $admin;
    }

    public function updateDetail (Request $request) {

        $rules = [
            'admin_email'        => 'required|string|max:50',
            'username'           => 'required|string|max:50',
            'password'           => 'required|string|min:6|max:255',
            'c_password'         => 'required_with:password|same:password',
        ];

        $validation = $this->adminService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $update_detail = $this->adminService->updateDetail($request);

        return $update_detail;
    }
}
