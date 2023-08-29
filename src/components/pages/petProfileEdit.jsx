/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import PetProfileEditForm from "../forms/petProfileEdit/petProfileEditForm";
import NavBar from "../navigation/navbar/navbar";

// Display Register Form
const PetProfileEdit = () => {
  return (
    <React.Fragment>
      <NavBar />
      <PetProfileEditForm />
    </React.Fragment>
  );
};

export default PetProfileEdit;
