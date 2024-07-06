import { storage, ref, uploadBytes } from "../firebase";

const useUploadToStorage = () => {
    function generateShortUUID() {
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 7; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex).toUpperCase();
        }
        return result;
    }

    const handleUpload = async (audioBlob, e) => {
        const filename = generateShortUUID();
        try {
            const storageRef = ref(storage, filename);
            return await uploadBytes(storageRef, audioBlob);
        } catch (error) {
            alert("Error subiendo el audio");
        }
    };
    return { handleUpload };
};

export default useUploadToStorage;
