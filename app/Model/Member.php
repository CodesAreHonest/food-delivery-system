<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Member extends Authenticatable
{
    use Notifiable;

    protected $guard = 'member';

    protected $table = 'member';

    protected $fillable = [
        's_username', 's_email', 's_address', 's_password'
    ];

    protected $hidden = [
        's_password'
    ];

    public function getAuthPassword() {
        return $this->s_password;
    }

    public static function check_credit_card ($member_email) {

        $member = Member::where('s_email', $member_email)
            ->where('b_card_information', 1)
            ->first(['b_card_information']);

        $outcomes = $member ? $member['b_card_information'] : false;

        return $outcomes;
    }
}
