import { useState, useRef, useEffect } from "react";

const useRecordAudio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const [audioTimeoutValue, setAudioTimeoutValue] = useState(3);
    const [audioTimeout, setAudioTimeout] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const changeAudioTimeoutValue = (value) => {
        setAudioTimeoutValue(value);
    };

    const handleStartRecording = async () => {
        setAudioTimeout(true);
        setTimeout(async () => {
            setAudioTimeout(false);
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
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        }, 3000);
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setAudioTimeoutValue(3);
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
        changeAudioTimeoutValue,
        audioTimeout,
        audioTimeoutValue,
        audioBlob,
        audioURL,
        isRecording,
    };
};

export default useRecordAudio;
