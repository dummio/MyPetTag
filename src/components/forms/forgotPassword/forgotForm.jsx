/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import logo from "../../../images/paw.png";
import "./forgotForm.css";
import ForgotConfirmation from "./forgotConfirm";

const ForgotForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [email, setEmail] = useState("");

  const ValidateEmail = (email) => {
    if (email === "" && canSubmit === false) {
      return true;
    }
    return /\S+@\S+\.\S+/.test(email);
  };

  const ValidateForm = () => {
    let isValid = false;
    if (ValidateEmail(email)) isValid = true;
    setCanSubmit(isValid);
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");
    if (!ValidateEmail(email)) {
      if (errorText !== null) {
        errorText.innerHTML = "Email is invalid!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else {
      if (errorText !== null) {
        errorText.style.display = "none";
        errorText.style.visibility = "hidden";
      }
    }
  };

  const forgotSubmit = (e) => {
    e.preventDefault();
    setConfirmSubmit(true);
  };

  useEffect(ValidateForm, [email]);
  useEffect(ErrorHandle, [email]);

  if (confirmSubmit) {
    return <ForgotConfirmation />;
  }
  return (
    <div id="forgot-container">
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
      <form id="forgot-form">
        <label>Email</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
            localStorage.setItem("userEmail", e.target.value);
          }}
        />
        <div id="error-container">
          <p></p>
        </div>
        <input
          id="forgot-btn"
          type="submit"
          value="Submit"
          onClick={forgotSubmit}
        />
      </form>
    </div>
  );
};

export default ForgotForm;
