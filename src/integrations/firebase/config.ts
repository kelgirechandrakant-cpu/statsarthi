import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let authObj = {} as any;
let dbObj = {} as any;
let storageObj = {} as any;

try {
  if (!firebaseConfig.apiKey) {
    console.warn("Firebase config is missing API key. Please check your .env file. Firebase services will be mocked.");
  } else {
    app = initializeApp(firebaseConfig);
    authObj = getAuth(app);
    dbObj = getFirestore(app);
    storageObj = getStorage(app);
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
}

// Export the initialized services or dummy objects
export const auth = authObj;
export const db = dbObj;
export const storage = storageObj;
