/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import PetEdit from "../forms/petEdit/petEdit";
import NavBar from "../navigation/navbar/navbar";

/**
 * Pet Edit Page
 *
 * @returns HTML Element
 */
const PetProfileEdit = () => {
  return (
    <React.Fragment>
      <NavBar />
      <PetEdit />
    </React.Fragment>
  );
};

export default PetProfileEdit;
