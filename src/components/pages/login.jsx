/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import LoginForm from "../forms/login/loginForm";
//import NavBar from "../navigation/navbar/navbar";

// Display Login
const Login = () => {
  return (
    <React.Fragment>
      {/* <NavBar /> */}
      <LoginForm />
    </React.Fragment>
  );
};

export default Login;
