<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller{

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)){
            return response()->json([
                "error" => 'Credenciais Inválidas'
            ]);
        }

        $token = $request->user()->createToken('auth_token');

        return response()->json([
            'user' => auth()->user(),
            'token' => $token->plainTextToken,
        ]);
    }

}
