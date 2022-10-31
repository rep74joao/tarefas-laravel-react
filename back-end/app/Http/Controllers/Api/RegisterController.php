<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class RegisterController extends Controller{

    private $userRepository;

    public function __construct(UserRepository $userRepository){
        $this->userRepository = $userRepository;
    }

    public function register(Request $request){
        $user = $this->userRepository->register($request);

        if ($user){
            return response()->json([
                'user' => $user,
            ]);
        }else{
            return response()->json([
                'error' => "Erro ao criar novo usuário!",
            ]);
        }
    }
}
