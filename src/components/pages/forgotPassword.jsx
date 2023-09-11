/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import ForgotForm from "../forms/forgotPassword/forgotForm";

/**
 * Forgot Password Page
 *
 * @returns HTML Element
 */
const ForgotPassword = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ForgotForm />
    </React.Fragment>
  );
};

export default ForgotPassword;
