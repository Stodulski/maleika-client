import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { Main } from "./pages/main";
import { Login } from "./pages/login";

export const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
            </Router>
        </>
    );
};
