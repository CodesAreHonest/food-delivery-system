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
        's_username', 's_email', 's_address'
    ];

    protected $hidden = [
        's_password'
    ];

}
