import React, { useState, useEffect } from "react";

import useAudioPlayer from "../hooks/useAudioPlayer";

import AudioView from "./audioView";

export const AudioSection = () => {
    const [audioURL, setAudioURL] = useState("");
    const { handleChangeInput, searchAudio } = useAudioPlayer();
    
    return (
        <section className="flex flex-col max-w-[700px] w-[85vw] gap-y-5 border-b-[1px] border-gray-200 pb-5 text-center sm:text-left">
            <h1 className="text-white text-3xl font-semibold">
                Ingresá tu código
            </h1>
            <div>
                <p className="text-gray-200 text-sm">
                    Descubri el mensaje que hicieron pensando especialmente en
                    vos. ❤
                </p>
                <p className="text-gray-200 text-sm mt-2">
                    Ingresá el codigo en el cuadro de abajo y presiona escuchar
                    para reproducir tu audio.
                </p>
            </div>
            <div className="flex w-full font-medium justify-center items-center">
                <input
                    type="text"
                    className="w-[100%] py-1.5 px-4 outline-none border-none rounded-s-full text-center"
                    placeholder="Ingrese codigo"
                    onChange={(e) => handleChangeInput(e)}
                />
                <button
                    onClick={() => searchAudio(setAudioURL)}
                    className="bg-zinc-900 text-white py-1.5 px-4 rounded-e-full hover:bg-zinc-800"
                >
                    Escuchar
                </button>
            </div>
            {audioURL.length > 0 && (
               <AudioView audioURL={audioURL}/>
            )}
        </section>
    );
};
