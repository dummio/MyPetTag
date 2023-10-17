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
import {
  faPen,
  faPlus,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";

//import firebase helper function
import { getUserData, removePetFromDatabase } from "../../../firebaseCommands";

import { useNavigate } from "react-router-dom";

/**
 * Handles all information about a users account filling in and updating data
 * pertaining to the user. Such as (Phone, Email, Name, and Pet Profiles)
 *
 * @returns Account HTML element.
 */
const AccountInformation = () => {
  const [user] = useState({
    Name: "Loading...",
    Email: "Loading...",
    Phone: "Loading...",
  });
  const [realUser, setUser] = useState(null);
  const [realEmail, setEmail] = useState(null);
  const [realPet, setRealPet] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      const userData = await getUserData().catch((error) => {
        navigate("/*", { replace: true });
      });
      if (userData) {
        setUser(userData[0]);
        setEmail(userData[1]);
        const userPets = userData[0].pets?.map((pet) => ({
          Key: pet.petID,
          Name: pet.name,
        }));
        setRealPet(userPets);
      }
    }
    fetchUserData();
  }, []);

  const renderPetButtons = () => {
    console.log("RENDERING BUTTONS");
    if (realUser) {
      if (realPet) {
        return realPet.map((userPet) => (
          <PetProfileButton
            key={userPet.Key}
            petId={userPet.Key}
            name={userPet.Name}
            deleting={deleting}
            setSelectedPet={setSelectedPet} // Pass the setSelectedPet function
            setShowConfirmation={setShowConfirmation}
          />
        ));
      } else {
        return <p>No pets</p>;
      }
    } else {
      return <p>Loading pets...</p>;
    }
  };

  useEffect(() => {
    renderPetButtons();
  }, [deleting]);

  const handlePetDeletion = async () => {
    console.log("selected pet being deleted: ", selectedPet);
    await removePetFromDatabase(selectedPet["id"]);

    const updatedRealPet = realPet.filter(
      (userPet) => userPet.Key !== selectedPet["id"]
    );
    setRealPet(updatedRealPet);

    setSelectedPet(null);
    setShowConfirmation(false);
    setDeleting(false);
  };

  return (
    <div id="account-container">
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
              onClick={() => {
                navigate("../settings", { replace: false });
              }}
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
            <p>Phone: {realUser ? realUser.phone : user.Phone}</p>
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
          <div id="pet-container-icons">
            <FontAwesomeIcon
              icon={faPlus}
              style={{ height: "31px", marginRight: "12px", cursor: "pointer" }}
              onClick={() => {
                navigate("/input-code", { replace: true });
              }}
            />

            <FontAwesomeIcon
              icon={deleting ? faX : faTrashCan}
              style={{ height: "31px", cursor: "pointer" }}
              onClick={() => {
                setDeleting(!deleting);
                console.log("deleting: ", deleting);
              }}
            />
          </div>
        </div>
        {renderPetButtons()}
        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-box">
              <p>Are you sure you want to delete {selectedPet?.name}?</p>
              <button onClick={handlePetDeletion}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInformation;
