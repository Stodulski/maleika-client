import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const Login = () => {
    const [userData, setUserData] = useState({ usuario: "", contraseña: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const { VITE_API } = import.meta.env;
        try {
            const response = await axios.post(`${VITE_API}/api/login`, {
                usuario: userData.usuario,
                contraseña: userData.contraseña,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            toast.success("Sesion iniciada con exito.", { duration: 2000 });
        } catch (error) {
            toast.error("Contraseña o usuario incorrecto.", { duration: 2000 });
        }
    };
    return (
        <main className="w-full h-screen grid place-content-center bg-zinc-900">
            <div className="card px-8 py-6 rounded-lg bg-gray-800 w-72">
                <h1 className="text-center font-bold text-3xl text-white">
                    Admin
                </h1>
                <form className="my-6" onSubmit={(e) => handleSubmitLogin(e)}>
                    <input
                        className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"
                        placeholder="Usuario"
                        type="text"
                        name="usuario"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        className="p-2 my-2 rounded w-[100%] focus:outline-blue-600"
                        placeholder="Contraseña"
                        type="password"
                        name="contraseña"
                        onChange={(e) => handleChange(e)}
                    />
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-[100%]">
                        Iniciar sesion
                    </button>
                </form>
            </div>
        </main>
    );
};
