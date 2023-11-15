/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import CSS
import "./accountSettings.css";
import logo from "../../../images/paw.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { getUserData } from "../../../firebaseCommands";
import { useNavigate } from "react-router-dom";

/**
 * Handles edit of all information about a users account filling in and updating data
 * pertaining to the user. Such as (Phone, Email, Name, and Pet Profiles)
 *
 * @returns Account Settings HTML element.
 */
const AccountSettings = () => {
  const [user] = useState({
    Name: "Loading...",
    Email: "Loading...",
    Phone: "Loading...",
  });
  const [realUser, setUser] = useState(null);
  const [realEmail, setEmail] = useState(null);

  const testUser = {
    name: "test",
    email: "test@test.com",
    phone: "801-899-8999",
    password: "test123!",
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      const userData = await getUserData().catch((error) => {
        navigate("/*");
      });
      if (userData) {
        setUser(userData[0]);
        setEmail(userData[1]);
      }
    }
    fetchUserData();
  }, []);

  const hidePassword = (item) => {
    return Array(item.length + 1).join("*");
  };

  return (
    <div id="account-settings-container">
      <div id="company-name-container">
        <h1>
          My<span style={{ color: "#75af96" }}>PetTag</span>
        </h1>
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={55}
          height={55}
        />
      </div>
      <div id="settings-title-container">
        <h1 id="settings-title">Account Settings</h1>
        <p id="settings-title-sub">Edit account and security settings.</p>
      </div>
      <div id="settings-container">
        <div className="user-setting-container">
          <h3>Name:</h3>
          <p>
            {realUser
              ? `${realUser.firstname} ${realUser.lastname}`
              : user.Name}{" "}
            <FontAwesomeIcon
              style={{ marginLeft: "8px", cursor: "pointer", fontSize: "16px" }}
              icon={faPen}
            />
          </p>
        </div>
        <hr />
        <div className="user-setting-container">
          <h3>Email:</h3>
          <p>
            {realEmail ? realEmail : user.Email}
            <FontAwesomeIcon
              style={{ marginLeft: "8px", cursor: "pointer", fontSize: "16px" }}
              icon={faPen}
            />
          </p>
        </div>
        <hr />
        <div className="user-setting-container">
          <h3>Phone Number:</h3>
          <p>
            {realUser ? realUser.phone : user.Phone}
            <FontAwesomeIcon
              style={{ marginLeft: "8px", cursor: "pointer", fontSize: "16px" }}
              icon={faPen}
            />
          </p>
        </div>
        <hr />
        <div className="user-checkbox-container">
          <h3>Notifications:</h3>
          <div id="checkbox-options-container">
            <div id="checkbox-container">
              <input className="form-checkbox" type="checkbox" />
              <input className="form-checkbox" type="checkbox" />
              <input className="form-checkbox" type="checkbox" />
            </div>
            <div id="checkbox-text-container">
              <p>Allow MyPetTag to send you email alerts.</p>
              <p>Allow MyPetTag to send you text alerts.</p>
              <p>Allow MyPetTag to send you mobile alerts.</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="user-setting-container">
          <h3>Password:</h3>
          <p>
            {hidePassword(testUser.password)}
            <FontAwesomeIcon
              style={{ marginLeft: "8px", cursor: "pointer", fontSize: "16px" }}
              icon={faPen}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
