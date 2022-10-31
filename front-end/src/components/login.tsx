import React, {useEffect, useState} from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import Api from "../Api";
import { useNavigate } from 'react-router-dom';
import Input from "./input";
import Button from "./button";
import {useUser} from "../context/user";

interface Login {
    email: string,
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState<Login>();
    const [password, setPassword] = useState<Login>();

    const {user} = useUser();

    const navigate = useNavigate();

    async function setForm(e){
        e.preventDefault()
        const formData = new FormData;

        formData.append('email', email);
        formData.append('password', password);

        const res = await Api.Login(formData);
        if (res.token){
            navigate('/home')
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                          Acessar minha conta
                        </h2>
                    </div>
                    <form onSubmit={setForm} className="mt-8 space-y-6"  method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <Input
                                label={'Email'}
                                type={'email'}
                                onchange={(e : React.FormEvent<EventTarget>) => setEmail(e.target.value)}
                            />
                            <Input
                                label={'Senha'}
                                type={'password'}
                                onchange={(e : React.FormEvent<EventTarget>) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                          <Button
                            label={'Entrar'}
                          />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
