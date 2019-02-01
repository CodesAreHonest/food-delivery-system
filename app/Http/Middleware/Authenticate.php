<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {

//        var_dump (Auth::guard('restaurant')->check()); exit();
//        var_dump ($request->all()); exit();
//
        if (! $request->expectsJson()) {
            return route('restaurant.login');
        }
    }
}
