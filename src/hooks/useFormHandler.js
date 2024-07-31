import { useState } from "react";

const useFormHandler = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return {
        formData,
        handleChange,
        setFormData,
    };
};

export default useFormHandler;
