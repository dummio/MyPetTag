// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "@firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const colRef = collection(db, "database");

// const docId = await addDoc(colRef, {
//   firstname: "Lebron",
//   lastname: "James",
// });

//const analytics = getAnalytics(app);
