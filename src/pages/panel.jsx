import React, { useEffect, useState } from "react";

import { IoLogOut } from "react-icons/io5";

import api from "../hooks/useAxiosApi";
import { Code } from "../components/code";
import { useAuth } from "../context/authContext";

import { toast } from "sonner";
export const Panel = () => {
    const { logout } = useAuth();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get("/get");
            updateData(response.data);
        } catch (error) {
            toast.error("Error cargando los códigos, recargue la página", {
                duration: Infinity,
            });
        }
    };

    const updateData = (codes) => {
        setData(codes);
        setFilteredData(codes);
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (searchTerm === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                item.archivo.toLowerCase().startsWith(lowerCaseSearchTerm)
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, data]);
    return (
        <>
            <header className="w-full h-16 bg-black text-white flex justify-between items-center px-5">
                <h1 className="text-xl">Admin</h1>
                <IoLogOut
                    className="text-4xl cursor-pointer"
                    onClick={logout}
                />
            </header>
            <main className="w-full">
                <section className="w-full grid place-content-center p-5">
                    <label className="flex flex-col justify-center items-center font-medium text-lg">
                        Buscar por codigo
                        <input
                            type="text"
                            placeholder="Codigo"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-center bg-slate-300 px-3 py-0.5 outline-none border-none mt-2.5 placeholder:font-normal"
                        />
                    </label>
                </section>
                <section className="p-5 gap-5 flex flex-wrap justify-center items-center">
                    {filteredData &&
                        filteredData.map((item) => (
                            <Code
                                id={item._id}
                                archivo={item.archivo}
                                key={item._id}
                                updateData={updateData}
                                nombre={item.nombre}
                                email={item.email}
                                telefono={item.telefono}
                                comprador={item.comprador}
                                data={data}
                            />
                        ))}
                </section>
            </main>
        </>
    );
};
