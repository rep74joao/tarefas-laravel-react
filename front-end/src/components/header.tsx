import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {NavLink, useNavigate} from "react-router-dom";
import {
    Bars3Icon,
} from '@heroicons/react/24/outline'
import {useUser} from "../context/user";

export default function Header() {
    const {user, logout} = useUser();

    const navigate = useNavigate();

    function logoutOut(){
        logout();
       return navigate('/login');
    }

    return (
        <Popover className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Abrir menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>

                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        {user ? (
                            <>

                                <NavLink
                                    onClick={() => logoutOut()}
                                    className={({ isActive }) =>
                                        isActive ? "ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-indigo-900" :
                                            "ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    }

                                >
                                    Sair
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to={'login'}
                                    className={({ isActive }) =>
                                        isActive ? "ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-indigo-900" :
                                            "ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to={'register'}
                                    className={({ isActive }) =>
                                        isActive ? "ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-indigo-900" :
                                            "ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    }
                                >
                                    Registrar
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="space-y-6 py-6 px-5">
                            <div>
                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Registrar
                                </a>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
