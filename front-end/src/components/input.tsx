import React from "react";

export default function Input({label, type, onchange, required = true} : string){
    return(
        <div>
            <label htmlFor="email-address" className="sr-only">
                {label}
            </label>
            <input
                id={label}
                name={label}
                type={type}
                required={required}
                onChange={onchange}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder={label}
            />
        </div>
    )
}