<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Restaurant extends Authenticatable
{
    use Notifiable;

    protected $guard = 'restaurant';

    protected $table = 'restaurant';

    protected $fillable = [
        's_restaurant_id', 's_restaurant_name', 's_password','s_address'
    ];

    protected $hidden = [
        's_password'
    ];

    public function getAuthPassword() {
        return $this->s_password;
    }

}
