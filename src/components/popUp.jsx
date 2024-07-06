import React, { useState } from "react";
import useFormHandler from "../hooks/useFormHandler";
import useFormSubmit from "../hooks/useFormSubmit";
import useUploadToStorage from "../hooks/useUploadToStorage";

export const PopUp = ({ audioURL, audioBlob, handleCancel }) => {
    const [codigo, setCodigo] = useState("");
    const { handleUpload } = useUploadToStorage();
    const { formData, handleChange } = useFormHandler({
        nombre: "",
        email: "",
        telefono: "",
        comprador: false,
    });
    const handleFormSubmit = useFormSubmit(handleUpload);
    return (
        <form
            onSubmit={(e) =>
                handleFormSubmit(
                    formData,
                    audioBlob,
                    setCodigo,
                    handleCancel,
                    e
                )
            }
            className="w-full max-w-[700px] fixed sm:my-5 sm:rounded-lg bg-slate-200 bottom-0 top-0 flex flex-col justify-evenly p-10 gap-y-5 overflow-y-auto"
        >
            {codigo.length > 0 ? (
                <div className="w-full h-full flex flex-col justify-between">
                    <div className="grid place-content-center h-full text-center gap-3">
                        <span className="font-bold text-xl">Su codigo es:</span>
                        <h3 className="font-bold text-2xl">{codigo}</h3>
                    </div>
                    <button
                        className="bg-zinc-800 p-2 rounded-full text-white"
                        onClick={() => {
                            handleCancel();
                            setCodigo("");
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            ) : (
                <>
                    <h3 className="text-3xl">Enviar audio</h3>
                    <p className="text-sm">
                        Complete todos los campos para recibir su codigo.
                    </p>
                    <label className="flex flex-col gap-y-1">
                        <span className="text-sm">Audio</span>
                        <audio controls className="w-full">
                            <source
                                src={audioURL}
                                type="audio/wav"
                                className="w-full"
                            />
                        </audio>
                    </label>
                    <label className="flex flex-col gap-y-1">
                        <span className="text-sm">Nombre y apellido</span>
                        <input
                            required
                            type="text"
                            placeholder="Nombre y apellido"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-[100%] py-2 px-4 outline-none border-none rounded-full placeholder:text-gray-300"
                        />
                    </label>
                    <label className="flex flex-col gap-y-1">
                        <span className="text-sm">Email</span>
                        <input
                            required
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-[100%] py-2 px-4 outline-none border-none rounded-full placeholder:text-gray-300"
                        />
                    </label>
                    <label className="flex flex-col gap-y-1">
                        <span className="text-sm">Telefono</span>
                        <input
                            required
                            type="tel"
                            placeholder="Telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-[100%] py-2 px-4 outline-none border-none rounded-full placeholder:text-gray-300"
                        />
                    </label>
                    <label className="flex gap-x-1.5 justify-center items-center">
                        <input
                            type="checkbox"
                            name="comprador"
                            checked={formData.comprador}
                            onChange={handleChange}
                        />
                        <span className="text-sm">
                            ¿Realizo la compra por la pagina web?
                        </span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="submit"
                            className="w-full bg-green-800 rounded-full py-2.5 text-white hover:bg-zinc-700"
                        >
                            Enviar
                        </button>
                        <button
                            type="button"
                            className="w-full bg-red-800 rounded-full py-2.5 text-white hover:bg-zinc-700"
                            onClick={() => handleCancel()}
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};
