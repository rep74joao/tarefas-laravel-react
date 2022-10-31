<?php

namespace App\Repositories\Contracts;

use App\Models\User;
use Illuminate\Http\Request;

interface TaskRepositoryInterface{

    public function create(Request $request);
    public function delete($id);
    public function getTasks($user_id);

}
