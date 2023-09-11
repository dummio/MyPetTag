/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import PetInformation from "../content/petProfileInfo/petProfileInfo/petInformation";
import Contacts from "../content/petProfileInfo/contactCard/contacts";
import Address from "../content/petProfileInfo/addressCard/address";
import HealthInformation from "../content/petProfileInfo/healthCard/health";
import BehaviorInformation from "../content/petProfileInfo/behaviorCard/behavior";
import VetProvider from "../content/petProfileInfo/vetProviderCard/vetProvider";
import LocationService from "../content/petProfileInfo/locationServices/locationService";

/**
 * Pet Profile Page
 *
 * @returns HTML Element
 */
const PetProfile = () => {
  return (
    <React.Fragment>
      <NavBar />
      <PetInformation />
      <Contacts />
      <Address />
      <HealthInformation />
      <BehaviorInformation />
      <VetProvider />
      <LocationService />
    </React.Fragment>
  );
};

export default PetProfile;
