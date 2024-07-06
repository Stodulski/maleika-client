import axios from "axios";

const useFormSubmit = (handleUpload) => {
    const { VITE_API } = import.meta.env;
    const handleFormSubmit = async (
        formData,
        audioBlob,
        setCodigo,
        handleCancel,
        e
    ) => {
        e.preventDefault();
        try {
            const result = await handleUpload(audioBlob, e);

            const response = await axios.post(
                `${VITE_API}/api/create`,
                { ...formData, archivo: result.metadata.name },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setCodigo(result.metadata.name);
            console.log(response.data);
        } catch (error) {
            handleCancel();
            console.log(error);
            alert("Error al enviar el audio.");
        }
    };

    return handleFormSubmit;
};

export default useFormSubmit;
