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
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState(false);

  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    login(email, password).then((response) => {
      let userId = response;
      if (userId) {
        setAuthState(true);
        navigate(`/user/${userId}/account`, { replace: true });
      } else {
        console.log("userID was false");
      }
    });
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");

    if (!authState) {
      if (errorText !== null && errorText === "") {
        errorText.innerHTML = "Email or Password is Incorrect!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else {
      if (errorText !== null) {
        errorText.innerHTML = "";
        errorText.style.display = "none";
        errorText.style.visibility = "hidden";
      }
    }
    // If false
    // Password or Email is Incorrect
    // Else error text is empty
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
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          className="form-input"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div id="error-container">
          <p></p>
        </div>
        <input
          id="login-btn"
          type="submit"
          value="Login"
          onClick={submitLogin}
        />
      </form>
      <div className="login-links">
        <a href="/forgot">Forgot Password?</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;
