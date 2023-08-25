/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import CSS
import "./loginForm.css";
import logo from "../../../images/paw.png";

const LoginForm = () => {
  return (
    <div id="login-container">
      <img
        className="logo"
        src={logo}
        alt="MyPetTag"
        width={250}
        height={250}
      />
      <form id="login-form">
        <label>Username</label>
        <input className="form-input" type="text" onChange={(e) => {}} />
        <label>Password</label>
        <input className="form-input" type="password" onChange={(e) => {}} />
        <input id="login-btn" type="submit" value="Login" onClick={(e) => {}} />
      </form>
      <div className="login-links">
        <a href="/forgot">Forgot Password?</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;
