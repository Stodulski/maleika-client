import React from "react";

export const Loading = () => {
    return (
        <div className="w-full h-screen z-50 fixed left-0 right-0 top-0 bottom-0 grid place-content-center bg-black/85">
            <div className="spinner"></div>
            <p className="mt-5 font-extrabold text-white text-2xl">Materializando tu recuerdo...</p>
        </div>
    );
};
