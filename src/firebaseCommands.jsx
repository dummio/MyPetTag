import { db } from "./firebase-config";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const _uid = userCredential.user.uid;
    uid = _uid;

    await setDoc(doc(db, "users", uid), {
      firstname: firstname_,
      lastname: lastname_,
      uid: _uid,
    });
    return uid;
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
    return uid;
  } catch (error) {
    return false;
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
    // const userDocSnap = await getDoc(userDocRef);

    //console.log(userDocSnap.data());
    //var petID_ = userDocSnap.data().pets.length;

    const pet = {
      petID: 1,
      name: name_,
      addr: addr_,
      breed: breed_,
      sex: sex_,
      descr: descr_,
      behavior: behavior_,
      contacts: contacts_,
      vets: vets_,
      // images: [],
    };

    console.log(pet);
    setDoc(userDocRef, { pets: [pet] }, { merge: true });

    // console.log(userDocSnap.data().pets);
  } catch (error) {
    console.log("Error occured during pet registration: ", error);
    console.log(uid);
  }
}
