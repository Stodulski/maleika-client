import { useState, useEffect } from "react";
import api from "./useAxiosApi";
import useStorage from "./useStorage";
import { toast } from "sonner";

const useAudioController = () => {
    const { handleDeleteAudio, handleUploadWithNewName, handleGetAudioFile } =
        useStorage();
    const [toggleEdit, setToggleEdit] = useState(false);

    const handleDelete = async (archivo, id, data, updateData) => {
        const confirmDelete = confirm(
            `¿Estas seguro de eliminar el código ${archivo}?`
        );
        if (!confirmDelete) {
            return;
        }
        let notificationWait;
        try {
            notificationWait = toast.info("Eliminando...", {
                duration: Infinity,
            });
            const response = await api.delete(`/delete/${id}`);
            await handleDeleteAudio(archivo);
            const newData = data.filter((item) => item._id !== id);
            toast.dismiss(notificationWait);
            toast.success("Audio eliminado con éxito.", { duration: 1000 });
            updateData(newData);
        } catch (error) {
            if (notificationWait) {
                toast.dismiss(notificationWait);
            }
            toast.error("Ha ocurrido un error.", { duration: 1000 });
        }
    };

    const handleUpdateAudioName = async (
        oldName,
        newName,
        data,
        updateData,
        id
    ) => {
        let notificationWait;
        try {
            notificationWait = toast.info(
                "Actualizando nombre del archivo...",
                {
                    duration: Infinity,
                }
            );
            const oldFile = await handleGetAudioFile(oldName);
            const newFileUrl = await handleUploadWithNewName(
                oldFile,
                newName.toUpperCase()
            );
            const response = await api.put(`/update/${id}`, {
                archivo: newName,
            });
            await handleDeleteAudio(oldName);
            const updatedData = data.map((item) =>
                item.archivo === oldName ? { ...item, archivo: newName } : item
            );
            toast.dismiss(notificationWait);
            toast.success("Nombre del archivo actualizado con éxito.", {
                duration: 1000,
            });
            updateData(updatedData);
        } catch (error) {
            if (notificationWait) {
                toast.dismiss(notificationWait);
            }
            console.log(error);
            toast.error(
                "Ha ocurrido un error al actualizar el nombre del archivo.",
                { duration: 1000 }
            );
        } finally {
            setToggleEdit(false);
        }
    };

    const toggleEditMode = () => {
        setToggleEdit(!toggleEdit);
    };

    useEffect(() => {
        if (toggleEdit) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "visible";
    }, [toggleEdit]);

    return {
        handleDelete,
        toggleEditMode,
        toggleEdit,
        handleUpdateAudioName,
    };
};

export default useAudioController;
