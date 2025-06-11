import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

// Vår egen typ som använder sig av en typ från expo/config
export interface CustomExpoConfig extends Partial<ExpoConfig> {
  extra: {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
  };
}

export default ({ config }: ConfigContext): CustomExpoConfig => ({
  ...config,
  extra: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIEBASE_MEASUREMENT_ID,
  },
});