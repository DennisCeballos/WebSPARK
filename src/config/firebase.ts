// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrYhV3ZMkJ3-DBDf3E_0Mncr6IjFp0RYI",
  authDomain: "proyectos-iniciativa-spark.firebaseapp.com",
  projectId: "proyectos-iniciativa-spark",
  storageBucket: "proyectos-iniciativa-spark.firebasestorage.app",
  messagingSenderId: "866786368858",
  appId: "1:866786368858:web:6c4e27cbe900e6ab34e763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Enable offline persistence
let persistenceEnabled = false;

export const initializeFirestore = async () => {
  try {
    // Enable offline persistence
    const { enableIndexedDbPersistence } = await import('firebase/firestore');
    await enableIndexedDbPersistence(db, {
      synchronizeTabs: true // Allow multiple tabs to use persistence
    });
    persistenceEnabled = true;
    console.log('Firebase persistence enabled successfully');
  } catch (error: any) {
    console.warn('Firebase persistence failed:', error);
    
    if (error.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (error.code === 'unimplemented') {
      console.warn('The current browser does not support all of the features required to enable persistence');
    }
    // Continue without persistence
  }
};

export const isPersistenceEnabled = () => persistenceEnabled;

export { db };

export default app;