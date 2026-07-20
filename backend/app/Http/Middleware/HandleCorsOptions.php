<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleCorsOptions
{
    /**
     * @param  Closure(Request): (Response)  $next

     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->getMethod() !== 'OPTIONS') {
            return $next($request);
        }

        $origin = $request->headers->get('Origin');
        $response = response()->noContent(204);

        if ($origin) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Vary', 'Origin');
        }

        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        );
        $response->headers->set(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization, X-Requested-With, Accept, Origin, User-Agent'
        );

        return $response;
    }
}

