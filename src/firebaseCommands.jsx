import { db } from "./firebase-config";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();
var uid = -1;

/**
 * This function is to be used when a new user registers
 * @param {*} firstname_
 * @param {*} lastname_
 * @param {*} email
 * @param {*} password
 */
export async function addNewUserToDatabase(
  firstname_,
  lastname_,
  email,
  password
) {
  //change to point to database
  try {
    const colRef = collection(db, "users");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const _uid = userCredential.user.uid;
    uid = _uid;
    const docId = await addDoc(colRef, {
      firstname: firstname_,
      lastname: lastname_,
      uid: _uid,
      pets: [],
    });
    return uid;
    console.log(docId.id);
  } catch (error) {
    console.log("Error occurred writing new user to firebase : ", error);
  }
}

export async function login(_email, _password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      _email,
      _password
    );
    uid = userCredential.user.uid;
    console.log("login success! ");
    console.log("uid : ", uid);
  } catch (error) {
    console.log("Error occurred during login : ", error);
  }
}

export async function addPetToDatabase(
  addr_,
  behavior_,
  breed_,
  descr_,
  name_,
  sex_,
  contacts_,
  vets_
) {
  try {
    const userDocRef = doc(db, "users", uid);

    const petID_ = userDocRef.data().pets.length;

    const pet = {
      petID: petID_,
      name: name_,
      addr: addr_,
      breed: breed_,
      sex: sex_,
      descr: descr_,
      behavior: behavior_,
      contacts: contacts_,
      vets: vets_,
      images: [],
    };

    await updateDoc(userDocRef, {
      pets: [...userDocRef.data().pets, pet],
    });

    console.log(userDocRef.data().pets);
  } catch (error) {
    console.log("Error occured during pet registration: ", error);
  }
}
