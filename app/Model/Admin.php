<?php

namespace App\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
       use Notifiable;

    protected $guard = 'admin';

    protected $table = 'admin';

    protected $fillable = [
        's_username', 's_name', 's_password'
    ];

    protected $hidden = [
        's_password'
    ];

    public function getAuthPassword() {
        return $this->s_password;
    }
}
