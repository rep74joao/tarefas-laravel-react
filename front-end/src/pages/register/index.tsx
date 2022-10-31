import React, {useState} from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import {useNavigate} from "react-router-dom";
import Api from "../../Api";
import {toast} from "react-toastify";

interface Register {
    email: string,
    password: string;
    nome: string;
}


export default function Register(){
    const [email, setEmail] = useState<Register>()
    const [password, setPassword] = useState<Register>()
    const [passwordConfirm, setPasswordConfirm] = useState<Register>()
    const [name, setName] = useState<Register>()

    const navigate = useNavigate();

    async function setForm(e){
        e.preventDefault()

        if (passwordConfirm !== password){
            return toast.warn('Senhas são diferentes!');
        }

        const formData = new FormData;

        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);

        const res = await Api.Register(formData);
        if (res.id){
            navigate('/login')
        }
    }


    return(
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                       Cadastrar Minha conta
                    </h2>
                </div>
                <form onSubmit={setForm} className="mt-8 space-y-6"  method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <Input
                            label={'Nome'}
                            type={'text'}
                            onchange={(e : React.FormEvent<EventTarget>) => setName(e.target.value)}
                        />
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
                        <Input
                            label={'Confirmar senha'}
                            type={'password'}
                            onchange={(e : React.FormEvent<EventTarget>) => setPasswordConfirm(e.target.value)}
                        />
                    </div>

                    <div>
                        <Button
                            type={'submit'}
                            label={'Cadastrar'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}