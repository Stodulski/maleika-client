import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
            login(token);
            toast.success("Sesion iniciada con exito.", { duration: 2000 });
            setTimeout(() => {
                navigate("/panel");
            }, 2000);
        } catch (error) {
            toast.error("Contraseña o usuario incorrecto.", { duration: 2000 });
        }
    };
    return { handleSubmitLogin, handleChange };
};

export default useLogin;
