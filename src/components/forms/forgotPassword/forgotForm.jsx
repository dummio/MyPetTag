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
import useForm from "../../../Hooks/useForm";

const ForgotForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formReset = () => {
    if (canSubmit) {
      // TODO: Actually do something before setting this
      setIsSubmitted(canSubmit);
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(formReset);

  useEffect(() => {
    let errorText = document.getElementById("error-container");
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      setCanSubmit(true);
      errorText.innerHTML = "";
      errorText.style.display = "flex";
      errorText.style.visibility = "hidden";
    } else {
      setCanSubmit(false);

      errorText.innerHTML = "";
      for (let key in errors) errorText.innerHTML += errors[key] + "<br/>";

      errorText.style.display = "flex";
      errorText.style.visibility = "visible";
    }
  }, [values, errors]);


  if (isSubmitted) {
    return <ForgotConfirmation />;
  } else {
    return (
      <div id="forgot-container">
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={250}
          height={250}
        />
        <form id="forgot-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
          <div id="error-container"></div>
          <input id="forgot-btn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
};

export default ForgotForm;
