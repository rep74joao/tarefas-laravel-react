import React, {createContext, useContext, useState, useEffect} from "react";
import Api from "../Api";

type User = {
    id: number,
    name:string,
    email:string,
}

type Task = {
    id: number,
    task:string,
    created_at:string,
}


type UserContextData = {
    user: User,
    token: string,
    getDataStorage: () => Promise<void>
    getTasks: () => Promise<void>
    logout: () => Promise<void>
}

export const UserContext = createContext({} as UserContextData);

function UserProvider({children} : UserContextData){
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    async function getDataStorage(){
        const userData = await sessionStorage.getItem('user');
        const token = await sessionStorage.getItem('token');

        if (userData && token){
            const u = JSON.parse(userData) as User;
            const t = token;
            setToken(t);
            setUser(u)
            const tt = await Api.GetTasks(u.id, t)
            setTasks(tt);
        }
    }

    async function logout(){
        await sessionStorage.removeItem('user');
        await sessionStorage.removeItem('token');
    }


    async function getTasks(){
        if (user){
            const t = await Api.GetTasks(user.id, token)
            setTasks(t);
        }
    }


    useEffect(() => {
        getDataStorage();
    },[])

    return (
        <UserContext.Provider value={{
            user, token, getTasks, tasks, logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

function useUser(){
    const context = useContext(UserContext);
    return context;
}

export {UserProvider, useUser};