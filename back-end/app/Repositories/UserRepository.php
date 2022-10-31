<?php

namespace App\Repositories;

use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Http\Request;
use App\Models\User;

class UserRepository implements UserRepositoryInterface{

    private $user;

    public function __construct(User $user){
        $this->user = $user;
    }

    public function register(Request $request){
        $userData = $request->only('name', 'email', 'password');
        $userData['password'] = bcrypt($userData['password']);

        if ($user = $this->user->create($userData)){
            return $user;
        }
    }

}
