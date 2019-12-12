<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\TransactionException;
use App\Http\Resources\User;

class VerifyPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $permissionID)
    {
        $user = Auth::user();
        if ($user->profileID == $permissionID) {
            return $next($request);
        }
        throw new TransactionException(new User($user), 'Permission Denied');
    }
}
