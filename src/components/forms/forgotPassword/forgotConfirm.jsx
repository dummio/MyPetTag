/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import CSS
import logo from "../../../images/paw.png";
const ForgotConfirmation = () => {
  let email = localStorage.getItem("userEmail");
  localStorage.clear();

  // Firebase to check to see if user validated email auth in order to reset password
  // Firebase then sends a auth bool to this page to then render the reset password page
  // The user should then be able to reset their password.

  return (
    <React.Fragment>
      <div id="forgot-container">
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={250}
          height={250}
        />
        <p style={{ width: "300px", fontSize: "24px" }}>
          An email has been sent to <b>{email}</b> please check your inbox for a
          reset password confirmation email.
        </p>
      </div>
    </React.Fragment>
  );
};

export default ForgotConfirmation;
