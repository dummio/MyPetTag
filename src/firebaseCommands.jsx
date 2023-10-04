import { db, auth, storage } from "./firebase-config";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  getDoc,
  arrayUnion,
  runTransaction,
  writeBatch,
} from "firebase/firestore";

import { ref, deleteObject } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * A wrapper for Firebase's authentication
 * @returns A promise for whether a user is authenticated
 */
export async function authStateChangedWrapper() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
        console.log(user.uid);
      } else {
        reject(new Error("No User Found"));
      }
    });
  });
}

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
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      firstname: firstname_,
      lastname: lastname_,
      uid: uid,
      phone: phone, // TODO: Verify if number is valid
    });
    return uid;
  } catch (error) {
    console.log("Error occurred writing new user to firebase : ", error);
  }
}

/**
 * Logs the user in, updates authentication state
 * @param {*} _email
 * @param {*} _password
 * @returns
 */
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

/**
 * Logs the user out, updates authentication status
 */
export async function logout() {
  signOut(auth)
    .then(() => {
      console.log("logout successful");
      return true;
    })
    .catch((error) => {
      console.log("Error occurred logging out : ", error);
      return false;
    });
}

/**
 * Checks the user authentication status. If user is logged in, adds
 * the pet to the corresonding user
 * @param {*} addr_
 * @param {*} behavior_
 * @param {*} breed_
 * @param {*} descr_
 * @param {*} name_
 * @param {*} sex_
 * @param {*} birthyear_
 * @param {*} weight_
 * @param {*} contacts_ A dictionary with keys "Name" and "Number"
 * @param {*} vets_ A dictionary with keys "name", "phone", "addr", "licenseId", "microchipId"
 */
export async function addPetToDatabase(
  tag_,
  name_,
  species_,
  breed_,
  descr_,
  birthDate_,
  weight_,
  sex_,
  addr_,
  vaccines_,
  conds_,
  meds_,
  allergies_,
  healthInfo_,
  aggressions_,
  goodWith_,
  behavior_,
  contacts_,
  vets_,
  imageUrl_
) {
  const uid = await authStateChangedWrapper();
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    //console.log(userDocSnap.data());
    const numPets = userDocSnap.data().pets?.length;
    // if (petID_ == undefined) {
    //   petID_ = 0;
    // }

    const petID_ =
      numPets === undefined
        ? 0
        : userDocSnap.data().pets[numPets - 1].petID + 1;

    console.log("adding pet with vaccines: ", vaccines_);
    const pet = {
      tag: tag_,
      petID: petID_,
      name: name_,
      species: species_,
      breed: breed_,
      descr: descr_,
      birthDate: birthDate_,
      weight: weight_,
      sex: sex_,
      addr: addr_,
      vaccines: vaccines_,
      conds: conds_,
      meds: meds_,
      allergies: allergies_,
      healthInfo: healthInfo_,
      aggressions: aggressions_,
      goodWith: goodWith_,
      behavior: behavior_,
      contacts: contacts_,
      vets: vets_,
      imageUrl: imageUrl_,
    };

    console.log(pet);

    if (userDocSnap.get("pets") == null) {
      setDoc(userDocRef, { pets: [pet] }, { merge: true });
    } else {
      await updateDoc(userDocRef, {
        pets: arrayUnion(pet),
      });
    }

    // Associate tag with this pet in tags collection
    if (tag_) {
      await setDoc(doc(db, "tags", tag_), {
        Pet: petID_,
        UserID: uid,
      });
    }
  } catch (error) {
    console.log("Error occured during pet registration: ", error);
    console.log(uid);
  }
}

// export async function removePetFromDatabase(petID) {
//   const uid = await authStateChangedWrapper();

//   try {
//     const userDocRef = doc(db, "users", uid);
//     const userDocSnap = await getDoc(userDocRef);

//     if (userDocSnap.exists()) {
//       const petsList = userDocSnap.data().pets;

//       let urlToDelete = null;
//       let tagToRenew = null;

//       // We need to search through the petList array to find the pet with
//       // the right petID. Although petIDs are initially the pet's index in
//       // the array, the petIDs may not match the indices after pet deletions
//       for (let i = 0; i < petsList.length; i++) {
//         const currPet = petsList[i];
//         if (currPet["petID"] == petID) {
//           urlToDelete = currPet["imageUrl"];
//           tagToRenew = currPet["tag"];
//         }
//       }
//       // This should never happen
//       if (urlToDelete == null || tagToRenew == null) {
//         throw new Error(
//           "Error when removing pet: Pet with correct petID not found"
//         );
//       }

//       const imageRef = ref(storage, urlToDelete);
//       deleteObject(imageRef)
//         .catch((error) => {
//           console.log("Error when deleting image: ", error);
//         })
//         .then(() => {
//           // Delete the pet: Delete petsList where pet["petID"] == petID
//           // Then, in the tags document, modify the document that has a key of tagToRenew
//           // defined above. Change the fields "Pet" and "UserID" of this document to be empty
//         });
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log("Error occurred removing pet: ", error);
//   }
// }

export async function removePetFromDatabase(petID) {
  const uid = await authStateChangedWrapper();

  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const petsList = userDocSnap.data().pets;

      let urlToDelete = null;
      let tagToRenew = null;

      // Find the pet to delete and retrieve its imageUrl and tag
      for (let i = 0; i < petsList.length; i++) {
        const currPet = petsList[i];
        if (currPet.petID === petID) {
          urlToDelete = currPet.imageUrl;
          tagToRenew = currPet.tag;
          // Remove the pet from the petsList
          petsList.splice(i, 1);
          break; // Exit the loop since we found the pet
        }
      }

      // Delete the image, then delete both the pet and the pet from the tag
      // in a batch. Deleting the image in the same batch did not work
      if (urlToDelete) {
        const imageRef = ref(storage, urlToDelete);
        deleteObject(imageRef)
          .catch((error) => {
            console.log("Error when deleting image: ", error);
          })
          .then(async () => {
            // Delete the pet: Delete petsList where pet["petID"] == petID
            const batch = writeBatch(db);
            batch.update(userDocRef, { pets: petsList });
            // Then, in the tags document, modify the document that has a key of tagToRenew
            // defined above. Change the fields "Pet" and "UserID" of this document to be empty
            if (tagToRenew) {
              const tagDocRef = doc(db, "tags", tagToRenew);
              batch.update(tagDocRef, { Pet: "", UserID: "" });
            }

            await batch.commit();
          });
      } else {
        // Delete the pet: Delete petsList where pet["petID"] == petID
        const batch = writeBatch(db);
        batch.update(userDocRef, { pets: petsList });
        // Then, in the tags document, modify the document that has a key of tagToRenew
        // defined above. Change the fields "Pet" and "UserID" of this document to be empty
        if (tagToRenew) {
          const tagDocRef = doc(db, "tags", tagToRenew);
          batch.update(tagDocRef, { Pet: "", UserID: "" });
        }

        await batch.commit();
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error occurred removing pet: ", error);
  }
}

/**
 * Returns user data to populate user home page
 * @returns
 */
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

/**
 * Returns pet data to populate pet profile page
 * @param {*} petID
 * @param {*} keys The pet fields to provide
 * @returns
 */
export async function getPetData(uid, petID, keys) {
  if (uid == null) {
    console.log("whadaito: ", uid);
    uid = await authStateChangedWrapper();
  }
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    let petData = {};
    if (userDocSnap.exists()) {
      // for-each loops are misbehaving. Use regular for-loops for now:
      const petsList = userDocSnap.data().pets;
      // Searching through the petsList for the correct petID may seem like
      // too much work since petIDs are initially assigned as the index of
      // the pet in the petsList, but this is actually a necessary step
      // since deleting pets can make the petIDs not match the indices.
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

/**
 *
 * @returns Determines whether user is authenticated
 */
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

/**
 * Method called when password is reset
 * @param {*} email
 */
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

export async function getCurrentUserEmail() {
  return await auth.currentUser.email;
}

export async function checkTagIdTaken(id) {
  let tagFields = null;
  try {
    const tagDocRef = doc(db, "tags", id);
    const tagDocSnap = await getDoc(tagDocRef);
    tagFields = [tagDocSnap.data().UserID, tagDocSnap.data().Pet];
    console.log(tagFields);
  } catch (error) {
    console.log(error);
  }
  return tagFields;
}

//gets all dog breeds woof
export async function getDogBreeds() {
  const dogBreedDocRef = doc(db, "dogBreeds", "Breeds");
  const dogBreedSnap = await getDoc(dogBreedDocRef);

  let dogBreeds = [];
  const dogBreedList = dogBreedSnap.data().List;
  for (let i = 0; i < dogBreedList.length; i++) {
    dogBreeds.push({
      label: dogBreedList[i],
      value: dogBreedList[i],
    });
  }
  console.log(dogBreeds);
  return dogBreeds;
}

//gets all cat breeds meow
export async function getCatBreeds() {
  const catBreedDocRef = doc(db, "catBreeds", "Breeds");
  const catBreedSnap = await getDoc(catBreedDocRef);

  let catBreeds = [];
  const catBreedList = catBreedSnap.data().List;
  for (let i = 0; i < catBreedList.length; i++) {
    catBreeds.push({
      label: catBreedList[i],
      value: catBreedList[i],
    });
  }
  console.log(catBreeds);
  return catBreeds;
}

export async function getUserAndPetIDFromTag(tagID) {
  const tagCodeRef = doc(db, "tags", tagID);
  const tagCodeSnap = await getDoc(tagCodeRef);
  console.log("HOWDYDO: ", tagCodeSnap.data().UserID);
  return [tagCodeSnap.data().UserID, tagCodeSnap.data().Pet];
}
