import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useFormSubmit = (handleUpload) => {
    const [loading, setLoading] = useState(false);
    const { VITE_API } = import.meta.env;
    const handleFormSubmit = async (
        formData,
        audioBlob,
        setCodigo,
        handleCancel,
        e
    ) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await handleUpload(audioBlob, e);
            setTimeout(async () => {
                const response = await axios.post(
                    `${VITE_API}/api/create`,
                    { ...formData, archivo: result.metadata.name },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setLoading(false);
                setCodigo(result.metadata.name);
                console.log("Su codigo es: " + result.metadata.name);
                toast.success("Audio subido correctamente.", {
                    duration: 3000,
                });
            }, 500);
        } catch (error) {
            setLoading(false);
            handleCancel();
            toast.error("Error al subir el audio.", { duration: 3000 });
        }
    };

    return { handleFormSubmit, loading };
};

export default useFormSubmit;
