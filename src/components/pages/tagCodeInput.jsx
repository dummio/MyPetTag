/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import TagCodeForm from "../forms/tagCodeInput/tagCodeInputForm";
import NavBar from "../navigation/navbar/navbar";

/**
 * Tag Code Input Page
 *
 * @returns HTML Element
 */
const TagCodeInput = () => {
  return (
    <React.Fragment>
      <NavBar />
      <TagCodeForm />
    </React.Fragment>
  );
};

export default TagCodeInput;
