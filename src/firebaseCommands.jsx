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
    console.debug("Error logging in: " + error);
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
    const userDocSnap = await getDoc(userDocRef);

    //console.log(userDocSnap.data());
    var petID_ = userDocSnap.data().pets?.length;
    if(petID_ == undefined) {
      petID_ = 0;
    }

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
      // images: [],
    };

    console.log(pet);

    if(userDocSnap.get('pets') == null) {
      setDoc(userDocRef, { pets: [pet] }, { merge: true });
    }
    else {
      await updateDoc(userDocRef, {
        pets: arrayUnion(pet),
      });
    }
  } catch (error) {
    console.log("Error occured during pet registration: ", error);
    console.log(uid);
  }
}

export async function getPetData() {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists) {
      return userDocSnap.data().pets;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error occurred getting pet data: ", error);
  }
}
