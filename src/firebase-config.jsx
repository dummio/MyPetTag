// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = await initializeApp(firebaseConfig);
export const auth = await getAuth(app);
export const db = await getFirestore(app);

// function generateRandomString(length) {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     result += characters.charAt(randomIndex);
//   }
//   return result;
// }

// //const jsonObject = {};
// const generatedKeys = new Set();

// while (generatedKeys.size < 5000) {
//   const randomKey = generateRandomString(6);
//   if (!generatedKeys.has(randomKey)) {
//     generatedKeys.add(randomKey);
//   }
// }

// for(let key of generatedKeys) {
//   await setDoc(doc(db, "tags", key), {
//     Pet: '',
//     UserID: '',
//   });
// }
