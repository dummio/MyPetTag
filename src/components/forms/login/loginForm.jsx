/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import "./loginForm.css";
import logo from "../../../images/paw.png";

//import firebase helper function
import { login } from "../../../firebaseCommands";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
      login(email, password);
  };

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
        <label>Email</label>
        <input className="form-input" type="text" onChange={(e) => {setEmail(e.target.value)}} />
        <label>Password</label>
        <input className="form-input" type="password" onChange={(e) => {setPassword(e.target.value)}} />
        <input id="login-btn" type="submit" value="Login" onClick={submitLogin} />
      </form>
      <div className="login-links">
        <a href="/forgot">Forgot Password?</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;
