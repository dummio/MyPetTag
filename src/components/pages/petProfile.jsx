/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import PetInformation from "../content/petProfileInfo/petProfileInfo/petInformation";
import Contacts from "../content/petProfileInfo/contactCard/contacts";
import Address from "../content/petProfileInfo/addressCard/address";
import HealthInformation from "../content/petProfileInfo/healthCard/health";
import BehaviorInformation from "../content/petProfileInfo/behaviorCard/behavior";
import VetProvider from "../content/petProfileInfo/vetProviderCard/vetProvider";
import LocationService from "../content/petProfileInfo/locationServices/locationService";


import { getUserAndPetIDFromTag } from "../../firebaseCommands";
/**
 * Pet Profile Page
 *
 * @returns HTML Element
 */
const PetProfile = () => {
  const [uID, setUID] = useState(null);
  const [pID, setPID] = useState(null);
  // let pID = null;
  // let uID = null;
  // function getUidAndPid() {
  //   if (window.location.pathname.split("/")[1] == "tag") {
  //     let ids = [];
  //     (async () => await getUserAndPetIDFromTag(
  //       window.location.pathname.split("/")[2]
  //     )).then()();
  //     pID = ids[1];
  //     uID = ids[0];
  //   } else {
  //     pID = window.location.pathname.split("/")[4];
  //   }
  // }
  // await getUidAndPid();
  // if (window.location.pathname.split("/")[1] == "tag") {
  //   const ids = await getUserAndPetIDFromTag(
  //     window.location.pathname.split("/")[2]
  //   );
  //   pID = ids[1];
  //   uID = ids[0];
  // } else {
  //   pID = window.location.pathname.split("/")[4];
  // }

  useEffect(() => {
    async function fetchData() {
      try {
        if (window.location.pathname.split("/")[1] == "tag") {
          const ids = await getUserAndPetIDFromTag(
            window.location.pathname.split("/")[2]
          );
          setUID(ids[0]);
          setPID(ids[1]);
        }
        else {
          setPID(window.location.pathname.split("/")[4]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (pID) {
    return (
      <React.Fragment>
        <NavBar />
        <PetInformation userID={uID} petID={pID} />
        <Contacts userID={uID} petID={pID} />
        <Address userID={uID} petID={pID} />
        <HealthInformation userID={uID} petID={pID} />
        <BehaviorInformation userID={uID} petID={pID} />
        <VetProvider userID={uID} petID={pID} />
        <LocationService />
      </React.Fragment>
    );
  }
};

export default PetProfile;
