import { useState, useRef, useEffect } from "react";

import { toast } from "sonner";

const useRecordAudio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const handleStartRecording = async (e) => {
        let cuenta = 3;
        let notificationPrepare = toast.info(`Empieza a grabar en ${cuenta}`, {
            duration: 1000,
        });
        const countInterval = setInterval(() => {
            cuenta--;
            toast.dismiss(notificationPrepare);
            notificationPrepare = toast.info(`Empieza a grabar en ${cuenta}`, {
                duration: 1000,
            });
            if (cuenta === 0) clearInterval(countInterval);
        }, 1000);
        e.target.disabled = true;

        setTimeout(async () => {
            toast.dismiss(notificationPrepare);
            e.target.disabled = false;
            const notificationRecording = toast.warning("Grabando...", {
                duration: Infinity,
            });
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, {
                    type: "audio/wav",
                });
                const audioUrl = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioURL(audioUrl);
                toast.dismiss(notificationRecording);
                toast.dismiss(notificationPrepare);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        }, 3000);
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
    };

    const handleCancel = () => {
        setAudioBlob(null);
        setAudioURL("");
        setIsRecording(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setAudioBlob(file);
        setAudioURL(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (audioURL.length > 0) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "visible";
    }, [audioURL]);

    return {
        handleStartRecording,
        handleStopRecording,
        handleCancel,
        handleFileChange,
        audioBlob,
        audioURL,
        isRecording,
    };
};

export default useRecordAudio;
