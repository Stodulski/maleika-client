import { useState } from "react";

import { storage, ref, getDownloadURL } from "../firebase";
import { toast } from "sonner";

const useAudioPlayer = () => {
    const [audioInput, setAudioInput] = useState("");
    const handleChangeInput = (e) => {
        setAudioInput(e.target.value);
    };

    const searchAudio = async (setAudioURL) => {
        const storageRef = ref(storage, audioInput);
        const notificationWait = toast.info("Buscando audio...", {
            duration: Infinity,
        });
        try {
            const url = await getDownloadURL(storageRef);
            setAudioURL(url);
            toast.success("Reproduciendo audio...", { duration: 1500 });
        } catch (error) {
            toast.error("Audio no encontrado.", { duration: 1500 });
        } finally {
            toast.dismiss(notificationWait);
        }
    };

    return { handleChangeInput, searchAudio };
};
export default useAudioPlayer;
