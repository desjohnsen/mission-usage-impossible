import { CustomExpoConfig } from "@/app.config";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
} = (Constants.expoConfig as CustomExpoConfig)?.extra || {};

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

