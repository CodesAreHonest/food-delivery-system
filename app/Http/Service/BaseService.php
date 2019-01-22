<?php

namespace App\Http\Service;


use Illuminate\Support\Facades\Validator;

class BaseService
{

    public function __construct() {}

    /** =======================================================
     *  Validate request payload with given rules
     *  =======================================================
     *  @param array $payload
     *  @param array $rules
     *
     *  @return array $msg contains response message and codes
     * ======================================================= */

    public function validator ($payload, $rules) {

        $validator = Validator::make($payload, $rules);

        if ($validator->fails()) {
            $error_msg = '';

            foreach($validator->errors()->all() as $value) {
                $error_msg .= $value;
                $error_msg .= ' ';
            }

            $msg = [
                'response_code' => 422,
                'msgType'       => 'error',
                'msgTitle'      => 'Validation Failed',
                'msg'           => $error_msg
            ];

            return $msg;
        }

        $msg = [
            'response_code' => 200,
        ];

        return $msg;
    }

}