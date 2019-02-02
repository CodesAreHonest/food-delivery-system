<?php

namespace App\Http\Controllers\Member;

use App\Http\Service\Member\MemberService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LoginController extends Controller
{
    private $memberService;

    public function __construct(MemberService $memberService) {
        $this->memberService = $memberService;
    }

    public function login (Request $request) {

        $rules = [
            'email' => 'required|string|max:50',
            'password'  =>  'required|string|max:255'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        $login = $this->memberService->login ($request);

        switch ($login['response_code']) {
            case 200:
                return response()->json ($login, 200);
            case 401:
                return response()->json ($login);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ]);
        }
    }
}
