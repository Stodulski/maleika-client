import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { Panel } from "./pages/panel";
import { useAuth } from "./context/authContext";

export const App = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    {isAuthenticated && (
                        <>
                            <Route exact path="/panel" element={<Panel />} />
                            <Route
                                exact
                                path="/login"
                                element={<Navigate to={"/panel"} />}
                            />
                        </>
                    )}
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </Router>
        </>
    );
};
