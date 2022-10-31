import React, {createContext, useContext, useEffect, useState} from "react";
import Api from "../Api";
import {useUser} from "./user";

type Task = {
    id: number,
    task:string,
    created_at:string,
}

type TaskContextData = {
    task: Task,
    getTasks: (user_id: string, token:string) => Promise<void>
}

export const TaskContext = createContext({} as TaskContextData);

function TaskProvider({children} : TaskContextData){
    const [tasks, setTasks] = useState<Task[]>([]);

    const {user, token} = useUser();

    async function getTasks(){
        setTimeout(async () => {
            const t =  await Api.GetTasks(user.id, token)
            setTasks(t);
            console.log(t)
        },2000)
    }

    useEffect(() => {
        getTasks();
    },[])

    return (
        <TaskContext.Provider value={{
            tasks, getTasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}

function useTasks(){
    const context = useContext(TaskContext);
    return context;
}

export {TaskProvider, useTasks};