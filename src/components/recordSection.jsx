import React from "react";

import { PopUp } from "./popUp";

import useRecordAudio from "../hooks/useRecordAudio";

export const RecordSection = () => {
    const {
        handleStartRecording,
        handleStopRecording,
        handleCancel,
        handleFileChange,
        audioBlob,
        audioURL,
        isRecording,
    } = useRecordAudio();

    return (
        <>
            {audioURL && (
                <PopUp
                    audioBlob={audioBlob}
                    audioURL={audioURL}
                    handleCancel={handleCancel}
                />
            )}
            <section className="flex flex-col max-w-[700px] w-[85vw] gap-y-5 pt-5 text-center sm:text-left">
                <h2 className="text-white text-2xl font-semibold">
                    ¿Queres materializar momentos en una joya?
                </h2>
                <div>
                    <p className="text-gray-200 text-sm">
                        Graba tu voz, la risa de tu persona favorita, o lo que
                        quieras expresar!
                    </p>
                    <p className="text-gray-200 text-sm mt-2">
                        Vas a obtener un codigo para usar en nuestros productos
                        y reproducir el audio.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <label className="w-full bg-zinc-800 rounded-full py-2.5 text-white hover:bg-zinc-700 text-center cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept="audio/*"
                            onChange={(e) => handleFileChange(e)}
                        />
                        Subir un audio
                    </label>
                    <button
                        className="w-full bg-red-700 rounded-full py-2.5 text-white hover:bg-red-600"
                        onClick={
                            isRecording
                                ? handleStopRecording
                                : handleStartRecording
                        }
                    >
                        {isRecording
                            ? "Detener grabación"
                            : "Iniciar grabación"}
                    </button>
                </div>
            </section>
        </>
    );
};
