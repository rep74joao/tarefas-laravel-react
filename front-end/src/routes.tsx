import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import {ToastContainer} from "react-toastify";

const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Register = React.lazy(() => import('./pages/register'));

const PrivateRoute = ({ children, redirectTo }) => {
    const isAuthenticated = sessionStorage.getItem("token") !== null;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default function Router(){
    return(
        <>
            <Header/>

            <Routes>
                <Route path="/home" element={
                    <PrivateRoute redirectTo="/login">
                        <Home />
                    </PrivateRoute>
                }/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to={'/login'}/> } />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}