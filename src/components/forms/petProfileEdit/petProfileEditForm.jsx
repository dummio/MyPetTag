/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";
import { addPetToDatabase } from "../../../firebaseCommands";
import { useNavigate } from "react-router-dom";

// Import CSS
import logo from "../../../images/paw.png";
import "./petProfileEditForm.css";

const PetProfileEditForm = () => {
  const [petNameReg, setPetNameReg] = useState("");
  const [birthYearReg, setBirthYearReg] = useState("");
  const [weightReg, setWeightReg] = useState("");
  const [sexReg, setSexReg] = useState("");
  const [contactNameReg, setContactNameReg] = useState("");
  const [contactPhoneReg, setContactPhoneReg] = useState("");
  const [healthReg, setHealthReg] = useState("");
  const [behaviorReg, setBehaviorReg] = useState("");
  const [descriptionReg, setDescriptionReg] = useState("");
  const [breedReg, setBreedReg] = useState("");
  const [addressReg, setAddressReg] = useState("");
  const [vetNameReg, setVetNameReg] = useState("");
  const [vetAddress, setVetAddress] = useState("");
  const [vetPhone, setVetPhone] = useState("");
  const [vetLicenseID, setLiscenceID] = useState("");
  const [vetMicrochipID, setMicrochipID] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const ValidateForm = () => {
    let isValid = false;

    if (petNameReg) isValid = true;

    setCanSubmit(isValid);
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");

    if (petNameReg === "") {
      if (errorText !== null) {
        errorText.innerHTML = "Pet name cannot be empty!";
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
    petNameReg,
    birthYearReg,
    weightReg,
    sexReg,
    contactNameReg,
    contactPhoneReg,
    healthReg,
    behaviorReg,
    descriptionReg,
    breedReg,
    addressReg,
  ]);

  useEffect(ErrorHandle, [petNameReg]);

  const navigate = useNavigate();

  const UpdateProfile = (e) => {
    e.preventDefault();
    if (canSubmit) {
      addPetToDatabase(
        addressReg,
        "",
        breedReg,
        descriptionReg,
        petNameReg,
        sexReg,
        {'Name': contactNameReg, 'Phone': contactPhoneReg},
        {}
      );
      console.log("added pet");
      // .then((response) => {
      //   navigate("/", { replace: true });
      // })
      // .catch((err) => {
      //   console.debug(err);
      // });
    }
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
      <form id="register-form">
        <label>Pet Name</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setPetNameReg(e.target.value);
          }}
        />
        <label>Pet Breed</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setBreedReg(e.target.value);
          }}
        />
        <label>Description</label>
        <input
          className="form-input"
          type="text"
          maxLength={250}
          onChange={(e) => {
            setDescriptionReg(e.target.value);
          }}
        />
        <label>Pet Birth Year</label>
        <input
          className="form-input"
          type="number"
          onChange={(e) => {
            setBirthYearReg(e.target.value);
          }}
        />
        <label>Pet Weight</label>
        <input
          className="form-input"
          type="number"
          onChange={(e) => {
            setWeightReg(e.target.value);
          }}
        />
        <label>Pet Gender</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setSexReg(e.target.value);
          }}
        />
        <label>Contact Name</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setContactNameReg(e.target.value);
          }}
        />
        <label>Contact Phone</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setContactPhoneReg(e.target.value);
          }}
        />
        <label>Set Address</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setAddressReg(e.target.value);
          }}
        />
        <label>Health</label>
        <input
          className="form-input"
          type="text"
          disabled={true}
          onChange={(e) => {
            setHealthReg(e.target.value);
          }}
        />
        <label>Behavior</label>
        <input
          className="form-input"
          type="text"
          disabled={true}
          onChange={(e) => {
            setBehaviorReg(e.target.value);
          }}
        />
        <label>Vet Name</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setVetNameReg(e.target.value);
          }}
        />
        <label>Vet Phone</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setVetPhone(e.target.value);
          }}
        />
        <label>Vet Address</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setVetAddress(e.target.value);
          }}
        />
        <label>Vet License ID</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setLiscenceID(e.target.value);
          }}
        />
        <label>Vet Microchip ID</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setMicrochipID(e.target.value);
          }}
        />
        <div id="error-container">
          <p></p>
        </div>
        <input
          id="register-btn"
          type="submit"
          value="Update Pet Profile"
          onClick={UpdateProfile}
          disabled={!canSubmit}
        />
      </form>
    </div>
  );
};

export default PetProfileEditForm;
