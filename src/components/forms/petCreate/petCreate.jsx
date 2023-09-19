/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React
import React, { useState, useEffect } from "react";
import { addPetToDatabase } from "../../../firebaseCommands";
import { useNavigate } from "react-router-dom";

// Import CSS
import "./petCreate.css";
import logo from "../../../images/paw.png";
import SelectStyles from "../selectStyles/selectStyles";
import SelectMultiStyles from "../selectStyles/selectMultiStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Import Modules
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { NODE_PARENT_VALIDATIONS } from "@babel/types";

const PetCreate = () => {
  // Render States
  const [petInfoHide, setPetInfoHide] = useState(true);
  const [petHealthHide, setPetHealthHide] = useState(false);
  const [petBehaviorHide, setPetBehaviorHide] = useState(false);
  const [petVetHide, setPetVetHide] = useState(false);

  const [petName, setPetName] = useState(null);
  const [petSpecies, setPetSpecies] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petDescr, setPetDescr] = useState(null);
  const [petBirthDate, setPetBirthDate] = useState(null);
  const [petWeight, setPetWeight] = useState(null);
  const [petSex, setPetSex] = useState(null);
  const [petContactName, setPetContactName] = useState(null);
  const [petContactPhone, setPetContactPhone] = useState(null);
  const [petAddress, setPetAddress] = useState(null);
  const [petVaccines, setPetVaccines] = useState([]);
  const [petConditions, setPetConditions] = useState([]);
  const [petMeds, setPetMeds] = useState([]);
  const [petAllergies, setPetAllergies] = useState([]);
  const [petHealthInfo, setPetHealthInfo] = useState(null);
  const [petAggressions, setPetAggressions] = useState([]);
  const [petGoodWith, setPetGoodWith] = useState([]);
  const [petBehaviorInfo, setPetBehaviorInfo] = useState(null);
  const [clinicName, setClinicName] = useState(null);
  const [clinicAddr, setClinicAddr] = useState(null);
  const [clinicPhone, setClinicPhone] = useState(null);
  const [vetName, setVetName] = useState(null);
  const [microchipId, setMicrochipId] = useState(null);

  const [canSubmit, setCanSubmit] = useState(false);

  const ValidateForm = () => {
    let isValid = false;

    if (petName) isValid = true;

    setCanSubmit(isValid);
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");

    if (petName === "") {
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
    petName,
    petSpecies,
    petBreed,
    petDescr,
    petBirthDate,
    petWeight,
    petSex,
    petContactName,
    petContactPhone,
    petAddress,
    petVaccines,
    petConditions,
    petMeds,
    petAllergies,
    petHealthInfo,
    petAggressions,
    petGoodWith,
    petBehaviorInfo,
    { Name: petContactName, Phone: petContactPhone },
    {
      clinicName: clinicName,
      addr: clinicAddr,
      phone: clinicPhone,
      vetName: vetName,
      microchipId: microchipId,
    },
  ]);

  useEffect(ErrorHandle, [petName]);

  const navigate = useNavigate();

  const UpdateProfile = (e) => {
    console.log("Vaccines in update profile: ", petVaccines);
    e.preventDefault();
    console.log("Vaccines in update profile2: ", petVaccines);
    if (canSubmit) {
      addPetToDatabase(
        petName,
        petSpecies,
        petBreed,
        petDescr,
        petBirthDate,
        petWeight,
        petSex,
        petAddress,
        petVaccines,
        petConditions,
        petMeds,
        petAllergies,
        petHealthInfo,
        petAggressions,
        petGoodWith,
        petBehaviorInfo,
        { Name: petContactName, Phone: petContactPhone },
        {
          clinicName: clinicName,
          addr: clinicAddr,
          phone: clinicPhone,
          vetName: vetName,
          microchipId: microchipId,
        }
      )
        .then((response) => {
          setTimeout(navigate("../../account", { replace: true }), 1000);
        })
        .catch((err) => {
          console.debug(err);
        });
    }
  };

  // Select Arrays
  const PetTypes = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Other", label: "Other" },
  ];
  const PetSex = [
    { value: "Male", label: "Male" },
    { value: "Neutered Male", label: "Neutered Male" },
    { value: "Female", label: "Female" },
    { value: "Spayed Female", label: "Spayed Female" },
  ];
  const PetBreeds = [];
  const PetAgressions = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Children", label: "Children" },
    { value: "Cats", label: "Cats" },
    { value: "Dogs", label: "Dogs" },
    { value: "Other", label: "Other" },
  ];
  const PetGoodWith = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Children", label: "Children" },
    { value: "Cats", label: "Cats" },
    { value: "Dogs", label: "Dogs" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div id="create-container">
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
      <form id="create-form">
        <h1 id="create-form-title">Add New Pet</h1>
        <h2>
          Pet Information{" "}
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              paddingRight: "15px",
              cursor: "pointer",
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetInfoHide(!petInfoHide);
            }}
          />
        </h2>
        {petInfoHide && (
          <>
            <label>Pet Name</label>
            <input
              className="form-input"
              type="text"
              onChange={(e) => {
                setPetName(e.target.value);
              }}
            />
            <label>Pet Species</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={PetTypes}
              onChange={(e) => {
                if (e) {
                  console.log("value: ", e.value);
                  setPetSpecies(e.value);
                  // console.log("option ", selectedOption);
                  console.log("species: ", petSpecies);
                }
              }}
            />
            <label>Pet Breed</label>
            <CreatableSelect
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={PetBreeds}
              onChange={(e) => {
                setPetBreed(e.value);
              }}
            />
            <label>Pet Description</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
              onChange={(e) => {
                setPetDescr(e.target.value);
              }}
            />
            <label>Pet Age</label>
            <input
              className="form-input"
              type="date"
              style={{ appearance: "textfield" }}
              onChange={(e) => {
                setPetBirthDate(e.target.value);
              }}
            />
            <label>Pet Weight</label>
            <input
              className="form-input"
              type="number"
              style={{ appearance: "textfield" }}
              onChange={(e) => {
                setPetWeight(e.target.value);
              }}
            />
            <label>Pet Sex</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={PetSex}
              onChange={(e) => {
                setPetSex(e.value);
              }}
            />
            <div id="form-contacts-container">
              <label>Contacts</label>
              <FontAwesomeIcon icon={faPlus} style={{ height: "25px" }} />
            </div>
            {/* {Wrap in map to dynamically add more contacts} */}
            <input
              className="form-input"
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setPetContactName(e.target.value);
              }}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Phone Number"
              onChange={(e) => {
                setPetContactPhone(e.target.value);
              }}
            />
            {/*------------------------------------------------------------------*/}
            <label>Address</label>
            <input
              className="form-input"
              type="text"
              placeholder="1234 Park Ave, City, TX 12345"
              onChange={(e) => {
                setPetAddress(e.target.value);
              }}
            />
          </>
        )}
        <h2>
          Health Information{" "}
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              paddingRight: "15px",
              cursor: "pointer",
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetHealthHide(!petHealthHide);
            }}
          />
        </h2>
        {petHealthHide && (
          <>
            <label>Vaccines</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              onChange={(e) => {
                let newVaccines = [];
                e.forEach((item) => newVaccines.push(item.value));
                setPetVaccines(newVaccines);
              }}
            />
            <label>Health Conditions</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={PetAgressions}
              onChange={(e) => {
                let newConds = [];
                e.forEach((item) => newConds.push(item.value));
                setPetConditions(newConds);
              }}
            />
            <label>Medications</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={PetAgressions}
              onChange={(e) => {
                let newMeds = [];
                e.forEach((item) => newMeds.push(item.value));
                setPetMeds(newMeds);
              }}
            />
            <label>Allergies</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={PetAgressions}
              onChange={(e) => {
                let newAllergies = [];
                e.forEach((item) => newAllergies.push(item.value));
                setPetAllergies(newAllergies);
              }}
            />
            <label>Additional Information</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
              onChange={(e) => {
                setPetHealthInfo(e.target.value);
              }}
            />
          </>
        )}
        <h2>
          Behavior Information{" "}
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              paddingRight: "15px",
              cursor: "pointer",
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetBehaviorHide(!petBehaviorHide);
            }}
          />
        </h2>
        {petBehaviorHide && (
          <>
            <label>Aggressions</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={PetAgressions}
              onChange={(e) => {
                let newAggressions = [];
                e.forEach((item) => newAggressions.push(item.value));
                setPetAggressions(newAggressions);
              }}
            />
            <label>Good With</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={PetGoodWith}
              onChange={(e) => {
                let newGoodWith = [];
                e.forEach((item) => newGoodWith.push(item.value));
                setPetGoodWith(newGoodWith);
              }}
            />
            <label>Additional Information</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
              onChange={(e) => {
                setPetBehaviorInfo(e.target.value);
              }}
            />
          </>
        )}
        <h2>
          Vet Information{" "}
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              paddingRight: "15px",
              cursor: "pointer",
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetVetHide(!petVetHide);
            }}
          />
        </h2>
        {petVetHide && (
          <>
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Name"
              onChange={(e) => {
                setClinicName(e.target.value);
              }}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Address"
              onChange={(e) => {
                setClinicAddr(e.target.value);
              }}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Phone #"
              onChange={(e) => {
                setClinicPhone(e.target.value);
              }}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Vet Name"
              onChange={(e) => {
                setVetName(e.target.value);
              }}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Microchip ID"
              onChange={(e) => {
                setMicrochipId(e.target.value);
              }}
            />
          </>
        )}
        <input
          id="create-btn"
          type="submit"
          value="Create Pet"
          onClick={UpdateProfile}
          disabled={!canSubmit}
        />
      </form>
    </div>
  );
};

export default PetCreate;
