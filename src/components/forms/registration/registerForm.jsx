/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState, useContext } from "react";
import {
  addNewUserToDatabase,
  isUserAuthenticated,
} from "../../../firebaseCommands";
import { useNavigate } from "react-router-dom";
import useForm from "../../../Hooks/useForm";

// Import CSS
import logo from "../../../images/paw.png";
import "./registerForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import PasswordModal from "../../modals/passwordModal";
import ZipcodeModal from "../../modals/zipcodeModal";

import { RememberTagContext } from "../../providers/rememberTagProvider";

/**
 * Registration form allowing new users to register for MyPetTag
 * Saves all information in firebase and creates a new account.
 *
 * @returns HTML element
 */
const RegisterForm = () => {
  const { rememberedTag, setRemeberedTag } = useContext(RememberTagContext);
  console.log("Remembered tag in register: ", rememberedTag);

  const [canSubmit, setCanSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showZipCodeModal, setShowZipCodeModal] = useState(false);

  const navigate = useNavigate();

  // Prevents scanned new tag from being forgotten if register page is reloaded
  useEffect(() => {
    const tagFromLocalStorage = localStorage.getItem("rememberedTag");
    setRemeberedTag(tagFromLocalStorage);
  });

  /**
   * Submits Register Form, and send all information to firebase database
   * creates user and navigates to pet registration.
   */
  const formRegister = () => {
    if (canSubmit) {
      addNewUserToDatabase(
        values.firstname,
        values.lastname,
        values.zipcode,
        values.email,
        values.password,
        values.phone
      )
        .then((response) => {
          var uid = response;
          console.log(
            "remembered tag after adding user to db: ",
            rememberedTag
          );
          if (uid) {
            if (rememberedTag) {
              navigate(`/tag/${rememberedTag}/create`, { replace: true });
            } else {
              var path = `/user/account`;
              navigate(path, { replace: true });
            }
          }
        })
        .catch((err) => {
          console.debug(err);
        });
    }
  };

  const { handleChange, values, errors, handleSubmit } = useForm(formRegister);

  useEffect(() => {
    async function fetchAuth() {
      const isAuthed = await isUserAuthenticated();
      if (isAuthed) {
        navigate("/user/account", { replace: true });
      }
    }
    fetchAuth();
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

  const OpenZipCodeModal = () => {
    setShowZipCodeModal((prev) => !prev);
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
        <div className="error-container">{errors.firstname}</div>
        <input
          className="form-input"
          type="text"
          name="firstname"
          required
          onChange={handleChange}
        />
        <label>Last Name</label>
        <div className="error-container">{errors.lastname}</div>
        <input
          className="form-input"
          type="text"
          name="lastname"
          required
          onChange={handleChange}
        />
        <label>
          Zip Code{" "}
          <FontAwesomeIcon
            icon={faCircleQuestion}
            onClick={OpenZipCodeModal}
          />
        </label>
        <div className="error-container">{errors.zipcode}</div>
        <input
          className="form-input"
          type="text"
          name="zipcode"
          // required
          onChange={handleChange}
        />
        <label>Phone Number</label>
        <div className="error-container">{errors.phone}</div>
        <input
          className="form-input"
          type="text"
          name="phone"
          required
          onChange={handleChange}
        />
        <label>Email</label>
        <div className="error-container">{errors.email}</div>
        <input
          className="form-input"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />
        <label>Confirm Email</label>
        <div className="error-container">
          {values.email !== values.emailConfirm ? "Emails do not match." : null}
        </div>
        <input
          className="form-input"
          type="email"
          name="emailConfirm"
          required
          onChange={handleChange}
        />
        <label>
          Password{" "}
          <FontAwesomeIcon
            icon={faCircleQuestion}
            onClick={OpenPasswordModal}
          />
        </label>
        <div className="error-container">{errors.password}</div>
        <input
          className="form-input"
          type="password"
          name="password"
          required
          onChange={handleChange}
        />
        <label>Confirm Password</label>
        <div className="error-container">
          {values.password !== values.passwordConfirm
            ? "Passwords do not match."
            : null}
        </div>
        <input
          className="form-input"
          type="password"
          name="passwordConfirm"
          required
          onChange={handleChange}
        />
        {/* <div id="register-checkbox-container">
          <input className="form-checkbox" type="checkbox" />
          <p>Allow MyPetTag to send you email alerts.</p>
        </div> */}
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
      <ZipcodeModal showModal={showZipCodeModal} setShowModal={setShowZipCodeModal} />
    </div>
  );
};

export default RegisterForm;
