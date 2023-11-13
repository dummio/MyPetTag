/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useContext } from "react";

// Import Components
import LoginForm from "../forms/login/loginForm";
import NavBar from "../navigation/navbar/navbar";

/**
 * Login Page
 *
 * @returns HTML Element
 */
const Login = () => {
  return (
    <React.Fragment>
      <NavBar />
      <LoginForm />
    </React.Fragment>
  );
};

export default Login;
