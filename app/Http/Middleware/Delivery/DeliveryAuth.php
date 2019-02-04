<?php

namespace App\Http\Middleware\Delivery;

use Closure;

class DeliveryAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
            if ($request->session()->has('delivery_username')) {

            $request->merge(['delivery_username' => $request->session()->get('delivery_username')]);

            return $next($request);
        }

        return redirect('/delivery/login');
    }
}
