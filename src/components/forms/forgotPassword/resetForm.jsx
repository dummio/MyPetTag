/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import logo from "../../../images/paw.png";
import "./resetForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import NavBar from "../../navigation/navbar/navbar";

const ResetForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const ValidateForm = () => {
    let isValid = false;

    if (
      newPassword &&
      newPasswordConf &&
      newPassword === newPasswordConf &&
      ValidatePassword(newPassword) &&
      ValidatePassword(newPasswordConf)
    )
      isValid = true;

    setCanSubmit(isValid);
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

    if (!ValidatePassword(newPassword)) {
      if (errorText !== null) {
        errorText.innerHTML = "Password does not meet requirements!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else if (newPassword !== newPasswordConf) {
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

  useEffect(ValidateForm, [newPassword, newPasswordConf]);
  useEffect(ErrorHandle, [newPassword, newPasswordConf]);

  const navigate = useNavigate();
  const resetSubmit = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
    // Todo: Reset Password in Firebase
  };

  return (
    <div id="reset-container">
      <img
        className="logo"
        src={logo}
        alt="MyPetTag"
        width={250}
        height={250}
      />
      <form id="reset-form">
        <label>
          New Password{" "}
          <FontAwesomeIcon icon={faCircleQuestion} onClick={() => {}} />
        </label>
        <input
          className="form-input"
          type="password"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <label>Confirm New Password</label>
        <input
          className="form-input"
          type="password"
          onChange={(e) => {
            setNewPasswordConf(e.target.value);
          }}
        />
        <div id="error-container">
          <p>test</p>
        </div>
        <input
          id="reset-btn"
          type="submit"
          value="Submit"
          onClick={resetSubmit}
          disabled={!canSubmit}
        />
      </form>
    </div>
  );
};

export default ResetForm;