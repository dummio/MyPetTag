/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";
import PetProfileButton from "./petProfileButton";

// Import CSS
import "./accountInfo.css";
import logo from "../../../images/paw.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

//import firebase helper function
import { getUserData } from "../../../firebaseCommands";

const AccountInformation = () => {
  const [user] = useState({
    Name: "Loading...",
    Email: "Loading...",
    Phone: "801-855-2197",
  });
  const [realUser, setUser] = useState(null);
  const [realEmail, setEmail] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      const userData = await getUserData();
      if (userData) {
        setUser(userData[0]);
        setEmail(userData[1]);
      }
    }

    fetchUserData();
  });
  console.log("USER 2 DATA: ", realUser);

  const pet = [
    { Key: 0, Name: "Tommy" },
    { Key: 1, Name: "Mia" },
    { Key: 2, Name: "Charlie" },
    { Key: 3, Name: "Evelyn" },
  ];

  return (
    <div id="account-container">
      <div id="company-name-container">
        <h1>MyPetTag</h1>
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={55}
          height={55}
        />
      </div>

      <div id="user-information-container">
        <div id="user-name-container">
          <h1 id="welcome-text">Welcome</h1>
          <h1>
            {realUser ? realUser.firstname : user.Name.split(" ").splice(0, 1)}
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                marginLeft: "15px",
                cursor: "pointer",
              }}
              icon={faPen}
              //needs an onclick to edit users information
            />
          </h1>
        </div>

        <div id="user-container">
          <div id="user-info">
            <p>
              Name:{" "}
              {realUser
                ? `${realUser.firstname} ${realUser.lastname}`
                : user.Name}
            </p>
            <p>Email: {realEmail ? realEmail : user.Email}</p>
            <p>Phone: {user.Phone}</p>
          </div>

          <div id="user-options-container">
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
      </div>

      <div id="pet-profiles-container">
        <div id="pet-container-name">
          <h2>Pet Profiles</h2>
        </div>
        {pet.map((pet) => (
          <PetProfileButton key={pet.Key} petId={pet.Key} name={pet.Name} />
        ))}
      </div>
    </div>
  );
};

export default AccountInformation;
