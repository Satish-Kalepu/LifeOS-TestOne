import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let firebaseConfigRaw = process.env.VITE_FIREBASE_CONFIG;

// Fallback: Try reading from the config file if the environment variable is missing
if (!firebaseConfigRaw) {
  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(configPath)) {
      firebaseConfigRaw = fs.readFileSync(configPath, "utf-8");
      console.log("Firebase Admin: Loaded config from firebase-applet-config.json");
    }
  } catch (err) {
    console.warn("Firebase Admin: Could not read firebase-applet-config.json fallback.");
  }
}

if (!firebaseConfigRaw) {
  console.error("CRITICAL: VITE_FIREBASE_CONFIG environment variable and config file are missing.");
}

const firebaseConfig = JSON.parse(firebaseConfigRaw || "{}");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: firebaseConfig.projectId,
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (err) {
    console.error("Firebase Admin initialization failed:", err);
    // Fallback for environments where applicationDefault() might fail
    if (firebaseConfig.projectId) {
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
      console.log("Firebase Admin initialized with projectId only.");
    }
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
