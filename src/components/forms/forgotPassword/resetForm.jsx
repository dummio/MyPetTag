/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";
import useForm from "../../../Hooks/useForm";

// Import CSS
import logo from "../../../images/paw.png";
import "./resetForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../../modals/passwordModal";

const ResetForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const formSubmit = () => {
    if (canSubmit) {
      // TODO: Reset Password in Firebase
      navigate("/", { replace: true });
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(formSubmit);

  useEffect(() => {
    let errorText = document.getElementById("error-container");
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(values).length !== 0 &&
      values.password === values.passwordConfirm
    ) {
      setCanSubmit(true);
      errorText.innerHTML = "";
      errorText.style.display = "flex";
      errorText.style.visibility = "hidden";
    } else {
      setCanSubmit(false);
      errorText.innerHTML = "";
      for (let key in errors) errorText.innerHTML += errors[key] + "<br/>";
      if (values.password !== values.passwordConfirm)
        errorText.innerHTML += "Passwords do not match<br/>";
      errorText.style.display = "flex";
      errorText.style.visibility = "visible";
    }
  }, [values, errors]);

  const OpenPasswordModal = () => {
    setShowModal((prev) => !prev);
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
      <form id="reset-form" onSubmit={handleSubmit}>
        <label>
          New Password{" "}
          <FontAwesomeIcon
            icon={faCircleQuestion}
            onClick={OpenPasswordModal}
          />
        </label>
        <input
          className="form-input"
          type="password"
          name="password"
          required
          onChange={handleChange}
        />
        <label>Confirm New Password</label>
        <input
          className="form-input"
          type="password"
          name="passwordConfirm"
          onChange={handleChange}
        />
        <div id="error-container"></div>
        <input
          id="reset-btn"
          type="submit"
          value="Submit"
          disabled={!canSubmit}
        />
      </form>
      <PasswordModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default ResetForm;
