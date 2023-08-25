// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


/**
 * This function is to be used when a new user registers
 * @param {*} firstname_ 
 * @param {*} lastname_ 
 * @param {*} email
 * @param {*} password
 */
export async function addNewUserToDatabase(firstname_, lastname_, email, password) {
  const tempApp = await initializeApp(firebaseConfig);
  const tempDb = await getFirestore(tempApp);
  const colRef = await collection(tempDb, "database");
  console.log(firstname_);
  try {
    const docId = await addDoc(colRef, {
      firstname: firstname_,
      lastname: lastname_,
    });
    console.log(docId);
  }
  catch(err) {
    console.error("failed to write because :", err);
  }
  // const auth = getAuth();
  // createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //         const uid_ = userCredential.user.uid;
  //         //adds a new user document to the database
  //         //does not contain a list of pets because no pets are indicated at signup
  //         addDoc(colRef, {
  //             firstname: firstname_,
  //             lastname: lastname_,
  //             uid: uid_,
  //         }).then(() => {
  //             console.log("page added!");
  //         })
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //     });
}

//const analytics = getAnalytics(app);
