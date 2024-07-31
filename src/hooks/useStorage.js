import axios from "axios";
import {
    storage,
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL,
} from "../firebase";

const useStorage = () => {
    function generateShortUUID() {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 7; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex).toUpperCase();
        }
        return result;
    }

    const handleGetAudioFile = async (filename) => {
        const fileRef = ref(storage, `${filename}`);
        const url = await getDownloadURL(fileRef);
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename);
    };

    const handleUploadWithNewName = async (file, newName) => {
        const storageRef = ref(storage, `${newName}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return url;
    };

    const handleUpload = async (audioBlob, e) => {
        const filename = generateShortUUID();
        try {
            const storageRef = ref(storage, `${filename}`);
            return await uploadBytes(storageRef, audioBlob);
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleDeleteAudio = async (filename) => {
        const fileRef = ref(storage, filename);
        try {
            await deleteObject(fileRef);
        } catch (error) {
            throw new Error(error);
        }
    };

    return {
        handleUpload,
        handleDeleteAudio,
        handleGetAudioFile,
        handleUploadWithNewName,
    };
};

export default useStorage;
