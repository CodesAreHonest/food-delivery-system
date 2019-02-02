<?php

namespace App\Http\Middleware\Member;

use Closure;

class MemberAuth
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

        if ($request->session()->has('member_email')) {

            $request->merge(['member_email' => $request->session()->get('member_email')]);

            return $next($request);
        }

        return redirect('/member/login');
    }
}
