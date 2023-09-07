import { db, auth } from "./firebase-config";
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
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * This function is to be used when a new user registers
 * @param {*} firstname_
 * @param {*} lastname_
 * @param {*} email
 * @param {*} password
 */

let uid = -1;

async function authStateChangedWrapper() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
        console.log(user.uid);
      } else {
        reject("No User Found");
      }
    });
  });
//   await onAuthStateChanged(auth, (user) => {
//   if (user) {
//     uid = user.uid;
//     console.log(uid);
//   } else {
//     console.log("user auth not found");
//   }
// });
}


export async function addNewUserToDatabase(
  firstname_,
  lastname_,
  email,
  password,
  phone
) {
  //const auth = getAuth();
  //change to point to database
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const _uid = userCredential.user.uid;
    const uid = _uid;

    await setDoc(doc(db, "users", uid), {
      firstname: firstname_,
      lastname: lastname_,
      uid: _uid,
      phone: phone, // TODO: Verify if number is valid
    });
    return uid;
  } catch (error) {
    console.log("Error occurred writing new user to firebase : ", error);
  }
}

export async function login(_email, _password) {
  //const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      _email,
      _password
    );
    const uid = userCredential.user.uid;
    console.log(uid);
    return uid;
  } catch (error) {
    console.debug("Error logging in: " + error);
  }
}

export async function logout() {
  //const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("logout successful");
    })
    .catch((error) => {
      console.log("Error occurred logging out : ", error);
    });
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
  //const auth = getAuth();
  const uid = auth?.currentUser?.uid;
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    //console.log(userDocSnap.data());
    var petID_ = userDocSnap.data().pets?.length;
    if (petID_ == undefined) {
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

    if (userDocSnap.get("pets") == null) {
      setDoc(userDocRef, { pets: [pet] }, { merge: true });
    } else {
      await updateDoc(userDocRef, {
        pets: arrayUnion(pet),
      });
    }
  } catch (error) {
    console.log("Error occured during pet registration: ", error);
    console.log(uid);
  }
}

export async function getUserData() {
  //const auth = getAuth();
  const uid_t = await authStateChangedWrapper();
  try {
    console.log(uid_t);
    const userDocRef = doc(db, "users", uid_t);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      console.log("USER DATA FROM getUserData:", userDocSnap.data());
      return [userDocSnap.data(), auth.currentUser.email];
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.log("Error getting user data: ", error);
  }
}

export async function getPetData(keys) {
  //const auth = getAuth();
  const uid = auth?.currentUser?.uid;
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    let petData = {};
    if (userDocSnap.exists) {
      keys.forEach(element => {
        petData[element] = userDocSnap.get(element);
      });
      return petData;
    } else {
      throw new Error("User does not have any pets!");
    }
  } catch (error) {
    console.log("Error occurred getting pet data: ", error);
  }
}

export async function isUserAuthenticated() {
  // const currAuth = getAuth();
  // const currUser = currAuth.currentUser;
  // if (currUser != null) {
  //   console.log("curr user id:", currUser.uid);
  //   console.log("curr user:", currUser);
  //   return true;
  // } else {
  //   console.log("curr user id:", -1);
  //   return false;
  // }
  //const auth = getAuth();
  try {
    const uid_t = await authStateChangedWrapper();
    console.log("curr user id: ", uid_t);
    return uid_t != null;
  }
  catch(error) {
    console.log(error);
    return false;
  }
}
