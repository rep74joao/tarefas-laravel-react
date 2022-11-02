import React, {createContext,useReducer, useContext, useState, useEffect, ReactNode} from "react";
import Api from "../Api";
import {userReducer} from "../reducers/reducer";
import {ActionsTypes} from "../reducers/actions";

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
    getDataStorage: () => Promise<void>,
    getTasks: () => Promise<void>,
    logout: () => Promise<void>,
    tasks: []
}

export const UserContext = createContext({} as UserContextData);

function UserProvider({children} : ReactNode){

    const [state, dispatch] = useReducer(userReducer, {
        user: [],
        tasks:[],
        token:''
    });

    const {user, token, tasks} = state;

    async function getDataStorage(){
        const userData = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');

        if (userData && token){
            const u = JSON.parse(userData) as User;
            const tt = await Api.GetTasks(u.id, token);

            dispatch({
                type:ActionsTypes.GET_DATA_STORAGE,
                user: u,
                token: token,
                tasks: tt,
            })
        }
    }

    async function logout(){
        await sessionStorage.removeItem('user');
        await sessionStorage.removeItem('token');
    }


    async function getTasks(){
        dispatch({
            type: ActionsTypes.GET_TASKS,
            tasks: await Api.GetTasks(user.id, token)
        })
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