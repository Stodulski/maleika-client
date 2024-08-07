import React, { useState } from "react";
import { IoTrash, IoPencil } from "react-icons/io5";

import useAudioController from "../hooks/useAudioController";

export const Code = ({
    archivo,
    id,
    data,
    updateData,
    nombre,
    email,
    telefono,
    comprador,
}) => {
    const [newCode, setNewCode] = useState("");
    const { handleDelete, toggleEdit, handleUpdateAudioName, toggleEditMode } =
        useAudioController();
    return (
        <>
            {toggleEdit && (
                <div className="z-50 bg-black/85 w-full h-screen fixed top-0 right-0 left-0 bottom-0 grid place-content-center">
                    <input
                        type="text"
                        defaultValue={archivo}
                        onChange={(e) => setNewCode(e.target.value)}
                        placeholder="Ingrese el nuevo codigo"
                        className="px-4 py-2 text-center border-none outline-none mb-5"
                    />
                    <div className="flex flex-col w-full text-white gap-5">
                        <button
                            onClick={() =>
                                handleUpdateAudioName(
                                    archivo,
                                    newCode,
                                    data,
                                    updateData,
                                    id
                                )
                            }
                            className="bg-green-600 p-2 hover:bg-green-500"
                        >
                            Actualizar
                        </button>
                        <button
                            onClick={toggleEditMode}
                            className="bg-red-600 p-2 hover:bg-red-500"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
            <article className="flex w-[300px] justify-evenly items-center gap-1 text-center flex-col p-5 bg-zinc-950 text-white">
                <span className="text-xl w-full">{archivo}</span>
                <span className="text-xl w-full">{nombre}</span>
                <span className="text-xl w-full">{email}</span>
                <span className="text-xl w-full">{telefono}</span>
                <span className="text-xl w-full">
                    {comprador
                        ? "Compro en la tienda"
                        : "No compro en la tienda"}
                </span>
                <div className="flex gap-10 mt-2.5">
                    <IoTrash
                        className="text-2xl cursor-pointer hover:text-red-600"
                        onClick={() =>
                            handleDelete(archivo, id, data, updateData)
                        }
                    />
                    <IoPencil
                        className="text-2xl cursor-pointer hover:text-green-600"
                        onClick={toggleEditMode}
                    />
                </div>
            </article>
        </>
    );
};
