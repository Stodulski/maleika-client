import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const {
    VITE_FIREBASE_APIKEY,
    VITE_AUTH_DOMAIN,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET,
    VITE_MESSAGING_SENDER_ID,
    VITE_APP_ID,
} = import.meta.env;

const firebaseConfig = {
    apiKey: VITE_FIREBASE_APIKEY,
    authDomain: VITE_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    appId: VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, ref, uploadBytes, getDownloadURL, deleteObject };
