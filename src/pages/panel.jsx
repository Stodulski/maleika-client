import React from "react";

import { IoLogOut, IoTrash, IoPencil } from "react-icons/io5";

export const Panel = () => {
    return (
        <>
            <header className="w-full h-16 bg-black text-white flex justify-between items-center px-5">
                <h1 className="text-xl">Admin</h1>
                <IoLogOut className="text-4xl cursor-pointer" />
            </header>
            <main className="w-full">
                <section className="w-full grid place-content-center p-5">
                    <label className="flex flex-col justify-center items-center font-medium text-lg">
                        Buscar por codigo
                        <input
                            type="text"
                            placeholder="Codigo"
                            className="text-center bg-slate-300 px-3 py-0.5 outline-none border-none mt-2.5 placeholder:font-normal"
                        />
                    </label>
                </section>
                <section className="px-5 gap-5 flex flex-wrap justify-center items-center">
                    <article className="flex w-[300px] justify-evenly items-center h-12 bg-zinc-950 text-white">
                        <span className="text-xl">ADJGGA</span>
                        <div className="flex gap-2.5">
                            <IoTrash className="text-2xl cursor-pointer hover:text-red-600" />
                            <IoPencil className="text-2xl cursor-pointer hover:text-green-600" />
                        </div>
                    </article>
                </section>
            </main>
        </>
    );
};
