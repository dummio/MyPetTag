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
  sendPasswordResetEmail,
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

export async function authStateChangedWrapper() {
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
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      _email,
      _password
    );
    const uid = await authStateChangedWrapper();
    console.log(uid);
    return uid;
  } catch (error) {
    console.debug("Error logging in: " + error);
  }
}

export async function logout() {
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
  birthyear_,
  weight_,
  contacts_,
  vets_
) {
  const uid = await authStateChangedWrapper();
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
      birthyear: birthyear_,
      weight: weight_,
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

export async function getPetData(petID, keys) {
  const uid = await authStateChangedWrapper();
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    let petData = {};
    if (userDocSnap.exists()) {
      // TODO: Binary search
      // userDocSnap.data().pets.every((element) => {
      //   console.log("in loop");
      //   console.log("checking pet id: ", element["petID"]);
      //   if (element["petID"] == petID) {
      //     keys.forEach((innerElement) => {
      //       petData[innerElement] = element[innerElement];
      //     });
      //     console.log("pet data in getPetData inner loop: ", petData);
      //     return petData;
      //   }
      // });
      // console.log("pet data in getPetData outer loop: ", petData);
      // return petData;

      // for-each loops are misbehaving. Use regular for-loops for now:
      const petsList = userDocSnap.data().pets;
      // For now, searching through the entire pets array to find the one
      // with the right petID is useless, since petIDs are currently the same
      // as their index in the list. ie, we could just do petsList[petID].
      // In the future, however, this won't be the case, so we search through
      // the array.
      for (let i = 0; i < petsList.length; i++) {
        const currPet = petsList[i];
        if (currPet["petID"] == petID) {
          for (let j = 0; j < keys.length; j++) {
            const currKey = keys[j];
            petData[currKey] = currPet[currKey];
          }
          return petData;
        }
      }
    } else {
      // throw new Error("User does not have any pets!");
      return null;
    }
  } catch (error) {
    console.log("Error occurred getting pet data: ", error);
  }
}

export async function isUserAuthenticated() {
  try {
    const uid_t = await authStateChangedWrapper();
    console.log("curr user id: ", uid_t);
    return uid_t != null;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function sendPasswordReset(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Sent password reset");
      return null;
    })
    .catch((error) => {
      return error;
    });
}
