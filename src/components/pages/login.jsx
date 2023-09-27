/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import LoginForm from "../forms/login/loginForm";
import NavBar from "../navigation/navbar/navbar";
import Alert from "../navigation/alert/alert";

/**
 * Login Page
 *
 * @returns HTML Element
 */
const Login = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Alert />
      <LoginForm />
    </React.Fragment>
  );
};

export default Login;
