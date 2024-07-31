import React, { useState } from "react";
import useFormHandler from "../hooks/useFormHandler";
import useFormSubmit from "../hooks/useFormSubmit";
import useStorage from "../hooks/useStorage";

import { PopUpForm } from "./popUpForm";
import { Loading } from "./loading";

export const PopUp = ({ audioURL, audioBlob, handleCancel }) => {
    const [codigo, setCodigo] = useState("");
    const { handleUpload } = useStorage();
    const { formData, handleChange } = useFormHandler({
        nombre: "",
        email: "",
        telefono: "",
        comprador: false,
    });
    const { handleFormSubmit, loading } = useFormSubmit(handleUpload);
    return (
        <>
            {loading && <Loading />}
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
                        <img src="/logoBlack.png" alt="" className="w-32 mx-auto" />
                        <div className="grid place-content-center h-full text-center gap-3">
                            <span className="font-bold text-xl">
                                El codigo de tu moments es:
                            </span>
                            <h3 className="font-bold text-2xl">{codigo}</h3>
                        </div>
                        <button
                            className="bg-zinc-800 p-2 rounded-full text-white hover:bg-zinc-700"
                            onClick={() => {
                                handleCancel();
                                setCodigo("");
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <PopUpForm
                        audioURL={audioURL}
                        formData={formData}
                        handleCancel={handleCancel}
                        handleChange={handleChange}
                    />
                )}
            </form>
        </>
    );
};
