<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private $taskRepository;

    public function __construct(TaskRepository $taskRepository){
        $this->taskRepository = $taskRepository;
    }

    public function create(Request $request){
        $task = $this->taskRepository->create($request);
        if ($task){
            $result = $this->taskRepository->getTasks($request->user_id);
            return response()->json($result);
        }else{
            return response()->json([
                'error' => "Erro ao criar tarefa!",
            ]);
        }
    }

    public function delete($id){
        return $this->taskRepository->delete($id);
    }

    public function tasks($id){
        $result = $this->taskRepository->getTasks($id);
        return response()->json($result);
    }
}
