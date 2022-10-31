<?php

namespace App\Repositories;

use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskRepository implements TaskRepositoryInterface{

    private $task;

    public function __construct(Task $task){
        $this->task = $task;
    }

    public function create(Request $request){
        $taskData = $request->only('task', 'user_id', 'date');

        if ($task = $this->task->create($taskData)){
            return $task;
        }
    }

    public function delete($id){
       return $this->task->where('id', $id)->delete();
    }

    public function getTasks($user_id){
        $tasks = $this->task->where('user_id', $user_id)
                            ->orderBy('date', 'desc')
                            ->get();
        foreach ($tasks as $t){
            $t->date = convertDate($t->date);
        }
        return $tasks;
    }

}
