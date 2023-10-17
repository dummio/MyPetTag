/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import CSS
import "./loginForm.css";
import logo from "../../../images/paw.png";

//import firebase helper function
import { login, isUserAuthenticated } from "../../../firebaseCommands";
import { useNavigate } from "react-router-dom";

/**
 * Login form for MyPetTag, checks to see if user exists and is authenticated.
 *
 * @returns HTML Element
 */
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authState, setAuthState] = useState(false);
  //const [authID, setAuthID] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAuth() {
      const isAuthed = await isUserAuthenticated();
      if (isAuthed) {
        navigate("/user/account", { replace: true });
      }
    }
    fetchAuth();
  }, []);

  /**
   * Submits form input values to firebase and directs user to account page after auth.
   *
   * @param e: event
   */
  const submitLogin = (e) => {
    e.preventDefault();
    login(email, password).then((response) => {
      let userId = response;
      if (userId) {
        setAuthState(true);
        navigate(`/user/account`, { replace: true });
      } else {
        setAuthState(false);
        ErrorHandle();
      }
    });
  };

  /**
   * Handles Form Input Errors and Displays a relevant error message.
   */
  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");

    if (!authState) {
      if (errorText !== null) {
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
      <div className="company-title">
        My<span style={{ color: "#75af96" }}>PetTag</span>
      </div>
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
