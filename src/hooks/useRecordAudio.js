import { useState, useRef, useEffect } from "react";

const useRecordAudio = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioURL, setAudioURL] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleStartRecording = async () => {
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
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
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
