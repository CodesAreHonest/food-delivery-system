<?php

namespace App\Http\Middleware\Restaurant;

use Closure;

class RestaurantAuth
{
    public function handle($request, Closure $next)
    {

        if ($request->session()->has('restaurant_id')) {

            $request->merge(['restaurant_id', $request->session()->get('restaurant_id')]);

            return $next($request);
        }

        return redirect('/restaurant/login');

    }
}
