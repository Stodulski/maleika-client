import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const tokenFromStorage = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(!!tokenFromStorage);
    const [token, setToken] = useState(tokenFromStorage || "");

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            setIsAuthenticated(false);
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
