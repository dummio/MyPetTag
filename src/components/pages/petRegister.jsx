/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import PetCreate from "../forms/petCreate/petCreate";

/**
 * Pet Register Page
 *
 * @returns HTML Element
 */
const PetRegister = () => {
  return (
    <React.Fragment>
      <NavBar />
      <PetCreate />
    </React.Fragment>
  );
};

export default PetRegister;
