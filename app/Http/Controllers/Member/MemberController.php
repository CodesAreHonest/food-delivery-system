<?php

namespace App\Http\Controllers\Member;

use App\Http\Service\Member\MemberService;
use App\Model\Member;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class MemberController extends Controller
{
    private $memberService;
    public function __construct(MemberService $memberService) {
        $this->memberService = $memberService;
    }

    public function getDetail(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'                 => 'required|email|max:100'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Get Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->getDetail($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function getCreditCard(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'email'                 => 'required|email|max:100'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Get Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->getDetail($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }



    public function updateDetail(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'          => 'required|email|max:100',
            'username'              => 'required|string|min:3|max:50',
            'password'              => 'required|string|min:6|max:255',
            'confirm_password'      => 'required_with:password|same:password',
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Update Member Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->updateDetail ($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function updateLocation (Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'      => 'required|email|max:100',
            'address'           => 'required|string|max:255',
            'city'              => 'required|string|max:100',
            'state'             => 'required|string|max:100',
            'country'           => 'required|string|max:100',
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Update Member Location
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->updateLocation ($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ]);
        }
    }

    public function updateCreditCard(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
        	'member_email'              => 'required|email|max:100',
            'card_name'                 => 'required|string|max:50',
            'card_number'               => 'required|digits:16',
            'card_expired_date'         => 'required|min:5|max:5',
            'cvc'              		    => 'required|digits:3'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Update Member Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->updateCreditCard($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ]);
        }
    }

    public function updateBlockUser(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
            'member_email'          => 'required|email|max:100',
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation);
        }

        /** ==========================================================================
         *  Update Member Blockage
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->updateBlockUser($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail);
            case 404:
                return response()->json ($detail);
            case 500:
                return response()->json ($detail);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ]);
        }
    }
    
    public function getUserName() {

        $user = Member::where('s_email', Session::get('member_email'))
            ->first(['s_username']);

        return $user ? $user['s_username'] : 'User';
    }

    public function logout() {

        Session::forget('member_email');

        return redirect()->route('member.login');
    }

}
