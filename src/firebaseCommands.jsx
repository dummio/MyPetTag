import { db } from "./firebase-config";
import { addDoc, collection } from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

/**
 * This function is to be used when a new user registers
 * @param {*} firstname_
 * @param {*} lastname_
 * @param {*} email
 * @param {*} password
 */
//TODO::ADD ERROR LOGGING
export async function addNewUserToDatabase(firstname_, lastname_, email, password) {
  //change to point to database
  const colRef = collection(db, "users");
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const _uid = userCredential.user.uid;
  //adds a new user document to the database
  //does not contain a list of pets because no pets are indicated at signup
  const docId = await addDoc(colRef, {
    firstname: firstname_,
    lastname: lastname_,
    uid: _uid,
  })
  console.log(docId.id);
}
