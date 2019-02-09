<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Delivery extends Authenticatable
{
    use Notifiable;

    protected $guard = 'delivery';

    protected $table = 'delivery';

    protected $fillable = [
        's_username', 's_name', 's_password','s_address','s_com_description'
    ];

    protected $hidden = [
        's_password'
    ];

    public function getAuthPassword() {
        return $this->s_password;
    }

}