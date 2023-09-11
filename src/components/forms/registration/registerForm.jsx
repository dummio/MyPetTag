/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";
import { addNewUserToDatabase } from "../../../firebaseCommands";
import { useNavigate } from "react-router-dom";
import useForm from "../../../Hooks/useForm";

// Import CSS
import logo from "../../../images/paw.png";
import "./registerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import PasswordModal from "../../modals/passwordModal";

/**
 * Registration form allowing new users to register for MyPetTag
 * Saves all information in firebase and creates a new account.
 *
 * @returns HTML element
 */
const RegisterForm = () => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  /**
   * Submits Register Form, and send all information to firebase database
   * creates user and navigates to pet registration.
   */
  const formRegister = () => {
    if (canSubmit) {
      addNewUserToDatabase(
        values.firstname,
        values.lastname,
        values.email,
        values.password,
        values.phone
      )
        .then((response) => {
          var uid = response;
          if (uid) {
            var path = `/user/${uid}/pet/1/edit`;
            navigate(path, { replace: true });
          }
        })
        .catch((err) => {
          console.debug(err);
        });
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(formRegister);

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      Object.keys(values).length !== 0 &&
      values.email === values.emailConfirm &&
      values.password === values.passwordConfirm
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [values, errors]);

  const OpenPasswordModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div id="register-container">
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
      <form id="register-form" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          className="form-input"
          type="text"
          name="firstname"
          required
          onChange={handleChange}
        />
        <div className="error-container">{errors.firstname}</div>
        <label>Last Name</label>
        <input
          className="form-input"
          type="text"
          name="lastname"
          required
          onChange={handleChange}
        />
        <div className="error-container">{errors.lastname}</div>
        <label>Phone Number</label>
        <input
          className="form-input"
          type="text"
          name="phone"
          required
          onChange={handleChange}
        />
        <div className="error-container">{errors.phone}</div>
        <label>Email</label>
        <input
          className="form-input"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />
        <div className="error-container">{errors.email}</div>
        <label>Confirm Email</label>
        <input
          className="form-input"
          type="email"
          name="emailConfirm"
          required
          onChange={handleChange}
        />
        <div className="error-container">
          {values.email !== values.emailConfirm ? "Emails do not match." : null}
        </div>
        <label>
          Password
          {errors.password ? (
            <p className="error-container">{errors.password}</p>
          ) : null}
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
        <div className="error-container">{errors.password}</div>
        <label>Confirm Password</label>
        <input
          className="form-input"
          type="password"
          name="passwordConfirm"
          required
          onChange={handleChange}
        />
        <div className="error-container">
          {values.password !== values.passwordConfirm
            ? "Passwords do not match."
            : null}
        </div>
        <div id="register-checkbox-container">
          <input className="form-checkbox" type="checkbox" />
          <p>Allow MyPetTag to send you email alerts.</p>
        </div>
        <input
          id="register-btn"
          type="submit"
          value="Register"
          disabled={!canSubmit}
        />
        <div className="register-links">
          <p>
            Already Have an Account? <a href="/">Login here</a>
          </p>
        </div>
      </form>
      <PasswordModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default RegisterForm;
