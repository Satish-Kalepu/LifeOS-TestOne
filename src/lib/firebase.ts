import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Ensure we handle both default and named imports for the JSON config
const config = (firebaseConfig as any).apiKey ? firebaseConfig : (firebaseConfig as any).default;

if (!config || !config.apiKey) {
  console.error("Firebase Configuration Error: API Key is missing in firebase-applet-config.json");
}

const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app, config.firestoreDatabaseId);

export default app;
