/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import RegisterForm from "../forms/registration/registerForm";
import NavBar from "../navigation/navbar/navbar";

/**
 * Register Page
 *
 * @returns HTML Element
 */
const Register = () => {
  return (
    <React.Fragment>
      <NavBar />
      <RegisterForm />
    </React.Fragment>
  );
};

export default Register;
