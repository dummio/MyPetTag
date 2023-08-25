/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import logo from "../../../images/paw.png";
import "./registerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [userNameReg, setUserNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [passwordConfirmReg, setPasswordConfirmReg] = useState("");
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [emailConfirmReg, setEmailConfirmReg] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const ValidateForm = () => {
    let isValid = false;

    if (
      userNameReg &&
      passwordReg &&
      passwordConfirmReg &&
      passwordReg === passwordConfirmReg &&
      firstNameReg &&
      lastNameReg &&
      emailReg &&
      emailConfirmReg &&
      emailReg === emailConfirmReg &&
      ValidateEmail(emailReg) &&
      ValidateEmail(emailConfirmReg)
    )
      isValid = true;

    setCanSubmit(isValid);
  };

  const ValidateEmail = (email) => {
    if (email === "" && canSubmit === false) {
      return true;
    }
    return /\S+@\S+\.\S+/.test(email);
  };

  const ValidatePassword = (password) => {
    if (password === "") {
      return true;
    }
    // min 8 char, 1 num char, 1 lowercase, 1 uppercase, 1 special
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
      password
    );
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");

    if (!ValidateEmail(emailReg)) {
      if (errorText !== null) {
        errorText.innerHTML = "Email is invalid!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else if (!ValidateEmail(emailConfirmReg)) {
      if (errorText !== null) {
        errorText.innerHTML = "Confirm Email is invalid!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else if (emailReg !== emailConfirmReg) {
      if (errorText !== null) {
        errorText.innerHTML = "Emails do not match!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else if (!ValidatePassword(passwordReg)) {
      if (errorText !== null) {
        errorText.innerHTML = "Password does not meet requirements!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else if (passwordReg !== passwordConfirmReg) {
      if (errorText !== null) {
        errorText.innerHTML = "Passwords do not match!";
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

  useEffect(ValidateForm, [
    userNameReg,
    passwordReg,
    passwordConfirmReg,
    firstNameReg,
    lastNameReg,
    emailReg,
    emailConfirmReg,
  ]);

  useEffect(ErrorHandle, [
    emailReg,
    emailConfirmReg,
    passwordReg,
    passwordConfirmReg,
  ]);

  return (
    <div id="register-container">
      <img
        className="logo"
        src={logo}
        alt="MyPetTag"
        width={250}
        height={250}
      />
      <form id="register-form">
        <label>Username</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setUserNameReg(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <label>Confirm Email</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setEmailConfirmReg(e.target.value);
          }}
        />
        <label>First Name</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setFirstNameReg(e.target.value);
          }}
        />
        <label>Last Name</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setLastNameReg(e.target.value);
          }}
        />
        <label>
          Password{" "}
          <FontAwesomeIcon icon={faCircleQuestion} onClick={() => {}} />
        </label>
        <input
          className="form-input"
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Confirm Password</label>
        <input
          className="form-input"
          type="password"
          onChange={(e) => {
            setPasswordConfirmReg(e.target.value);
          }}
        />
        <div id="register-checkbox-container">
          <input className="form-checkbox" type="checkbox" />
          <p>Allow MyPetTag to send you email alerts.</p>
        </div>
        <div id="error-container">
          <p></p>
        </div>
        <input
          id="register-btn"
          type="submit"
          value="Register"
          onClick={() => {}}
          disabled={!canSubmit}
        />
        <div className="register-links">
          <p>
            Already Have an Account? <a href="/">Login here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
