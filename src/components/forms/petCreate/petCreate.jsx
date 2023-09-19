/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React
import React, { useState } from "react";

// Import CSS
import logo from "../../../images/paw.png";
import selectStyles from "../selectStyles/selectStyles";
import "./petCreate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Import Modules
import Select from "react-select";
import Animate from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const PetCreate = () => {
  // Render States
  const [petInfoHide, setPetInfoHide] = useState(false);
  const [petHealthHide, setPetHealthHide] = useState(false);
  const [petBehaviorHide, setPetBehaviorHide] = useState(false);
  const [petVetHide, setPetVetHide] = useState(false);

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
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" },
    { value: "test4", label: "test4" },
    { value: "test5", label: "test5" },
    { value: "test6", label: "test6" },
  ];
  const PetGoodWith = [];

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
            <input className="form-input" type="text" />
            <label>Pet Species</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={selectStyles}
              options={PetTypes}
            />
            <label>Pet Breed</label>
            <CreatableSelect
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={selectStyles}
              options={PetBreeds}
            />
            <label>Pet Description</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
            />
            <label>Pet Age</label>
            <input
              className="form-input"
              type="number"
              style={{ appearance: "textfield" }}
            />
            <label>Pet Weight</label>
            <input
              className="form-input"
              type="number"
              style={{ appearance: "textfield" }}
            />
            <label>Pet Sex</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={selectStyles}
              options={PetSex}
            />
            <div id="form-contacts-container">
              <label>Contacts</label>
              <FontAwesomeIcon icon={faPlus} style={{ height: "25px" }} />
            </div>
            {/* {Wrap in map to dynamically add more contacts} */}
            <input className="form-input" type="text" placeholder="Name" />
            <input
              className="form-input"
              type="text"
              placeholder="Phone Number"
            />
            {/*------------------------------------------------------------------*/}
            <label>Address</label>
            <input
              className="form-input"
              type="text"
              placeholder="1234 Park Ave, City, TX 12345"
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
              options={PetAgressions}
            />
            <label>Health Conditions</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              options={PetAgressions}
            />
            <label>Medications</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              options={PetAgressions}
            />
            <label>Allergies</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              options={PetAgressions}
            />
            <label>Additional Information</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
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
              options={PetAgressions}
            />
            <label>Good With</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              options={PetAgressions}
            />
            <label>Additional Information</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
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
            />
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Address"
            />
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Phone #"
            />
            <input className="form-input" type="text" placeholder="Vet Name" />
            <input
              className="form-input"
              type="text"
              placeholder="Microchip ID"
            />
          </>
        )}
        <input
          id="create-btn"
          type="submit"
          value="Create Pet"
          onClick={() => {}}
          disabled={() => {}}
        />
      </form>
    </div>
  );
};

export default PetCreate;
