<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redirect;

// I'm leaving this currently unused, but this is middleware that coould programatically
// redirect all www.mocside.com requests to http://mocside.com.
// I'm going to avoid this solution in favor of editing "../../../public/.htaccess"
// SRC: https://robindirksen.com/blog/redirect-www-to-non-www-urls-in-laravel

class RedirectWWW
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
        if (substr($request->header('host'), 0, 4) == 'www.') {
            $request->headers->set('host', 'mocside.com');

            return Redirect::to($request->path());
        }
        
        return $next($request);
    }
}