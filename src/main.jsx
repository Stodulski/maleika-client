import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <Toaster
            position="top-center"
            richColors
            theme="dark"
            visibleToasts={1}
        />
        <App />
    </AuthProvider>
);
