<?php

namespace App\Http\Controllers\Member;

use App\Http\Service\Member\MemberService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
            'email'                 => 'required|email|max:100'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
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
                return response()->json ($detail, 404);
            case 500:
                return response()->json ($detail, 500);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function getCreaditCard(Request $request) {

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
            return response()->json ($validation, 422);
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
                return response()->json ($detail, 404);
            case 500:
                return response()->json ($detail, 500);
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
            'email'                 => 'required|email|max:100',
            'username'              => 'required|string|max:50',
            'address'               => 'required|string|max:255'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
        }

        /** ==========================================================================
         *  Update Member Detail
         *  ==========================================================================
         *  @return 200 success
         *  @return 404 not found
         *  @return 500 internal server error
         *  @return 502 bad gateway
         *  =========================================================================== */

        $detail = $this->memberService->updateDetail($request);

        switch ($detail['response_code']) {
            case 200:
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail, 404);
            case 500:
                return response()->json ($detail, 500);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }

    public function updateCreditCard(Request $request) {

        /** ==========================================================================
         *  Payload validation
         *  ==========================================================================
         *  @return 422 Unprocessable Entity
         *  =========================================================================== */

        $rules = [
        	'email'                 => 'required|email|max:100',
            'card_name'                 => 'required|string|max:50',
            'card_number'              => 'required|digits:13',
            'card_expired_date'               => 'required|string|max:5',
            'cvc'              		 => 'required|string|max:3'
        ];

        $validation = $this->memberService->validator($request->all(), $rules);

        if ($validation['response_code'] === 422) {
            return response()->json ($validation, 422);
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
                return response()->json ($detail,200);
            case 404:
                return response()->json ($detail, 404);
            case 500:
                return response()->json ($detail, 500);
            default:
                return response()->json ([
                    'response_code' => 502,
                    'response_msg'  => 'Bad gateway'
                ], 502);
        }
    }
}
