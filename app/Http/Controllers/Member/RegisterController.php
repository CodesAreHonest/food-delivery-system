<?php

namespace App\Http\Controllers\Member;

use App\Http\Service\Member\MemberService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
    private $memberService;
    public function __construct(MemberService $memberService) {
        $this->memberService = $memberService;
    }

    public function register(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'register_username'            => 'required|string|max:50',
            'register_email'               => 'required|email|unique:member,s_email|max:100',
            'register_password'            => 'required|string|min:6|max:255',
            'register_c_password'          => 'required_with:password|same:register_password',
            'register_address'             => 'required|string|max:255',
            'register_state'               => 'required|string|max:100',
            'register_city'                => 'required|string|max:100',
            'register_country'             => 'required|string|max:100',
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Member Register
         *  ==========================================================================
         *  @return 200 success
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $register = $this->memberService->register($request);

        switch ($register['response_code']) {
            case 200:
                return response()->json ($register);
            case 500:
                return response()->json ($register);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
