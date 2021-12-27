<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckActive
{
    public function handle($request, Closure $next)
    {
        // if (Auth::user()->isAdmin())
        // {
        //     return $next($request);
        // }
        if (Auth::user()->isActive())
        {
            return $next($request);
        }
        return response()->json(['message' => 'This user is not active.'], 403);
    }
}