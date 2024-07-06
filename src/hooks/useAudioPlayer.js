import { useState } from "react";

import { storage, ref, getDownloadURL } from "../firebase";

const useAudioPlayer = () => {
    const [audioInput, setAudioInput] = useState("");
    const handleChangeInput = (e) => {
        setAudioInput(e.target.value);
    };

    const searchAudio = async (setAudioURL) => {
        const storageRef = ref(storage, audioInput);
        try {
            const url = await getDownloadURL(storageRef);
            setAudioURL(url);
        } catch (error) {
            alert("Audio no encontrado");
        }
    };

    return { handleChangeInput, searchAudio };
};
export default useAudioPlayer;
