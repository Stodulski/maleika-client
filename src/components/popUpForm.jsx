import React from "react";

export const PopUpForm = ({
    audioURL,
    formData,
    handleChange,
    handleCancel,
}) => {
    return (
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
    );
};
