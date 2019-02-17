<?php

namespace App\Http\Middleware;

use Closure;

class AdminAuth
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
        if ($request->session()->has('admin_email')) {

            $request->merge(['admin_email' => $request->session()->get('admin_email')]);

            return $next($request);
        }

        return redirect('/admin/login');
    }
}
