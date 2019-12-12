<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class TokenGenerator { 
    
    public static function makeToken($seed = null) { 
        // para generar la semilla, se concatena un valor recibido con la fecha y hora 
        $seed = $seed . \Carbon\Carbon::now();     
        $token = Hash::make($seed);
        //\Log::info("token desde Clase de usuario con semilla $seed: " . $token);
        return $token;
    }
    
    public static function saveTokenInCurrentUser($token) { 
        $user = auth()->user();
        $user->token = $token;
        $user->save();
    }
}