import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { Panel } from "./pages/panel";

export const App = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    {isAuthenticated && (
                        <Route path="/panel" element={<Panel />} />
                    )}
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </Router>
        </>
    );
};
