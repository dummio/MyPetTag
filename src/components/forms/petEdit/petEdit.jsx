/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import "./petEdit.css";
import logo from "../../../images/paw.png";
import defaultProfileImage from "../../../images/profile-default.png";
import SelectStyles from "../selectStyles/selectStyles";
import SelectMultiStyles from "../selectStyles/selectMultiStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Import Modules
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

/**
 * Displays Pet Profile Information that is editable by the user.
 * Once the user saves changes it writes the new changes to
 * firebase and updates the pet profile.
 *
 * @returns HTML Element
 */
const PetEdit = () => {
  // Render States
  const [petInfoHide, setPetInfoHide] = useState(true);
  const [petHealthHide, setPetHealthHide] = useState(false);
  const [petBehaviorHide, setPetBehaviorHide] = useState(false);
  const [petVetHide, setPetVetHide] = useState(false);

  // Temp Array
  const options = [];

  // Temp Name
  const pet = "pet-name";

  const UploadImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let image = URL.createObjectURL(file);
    let profileImage = document.getElementById("pet-img");
    profileImage.src = image;
  };

  return (
    <div id="edit-container">
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
      <form id="edit-form">
        <h1 id="edit-form-title">Editing {pet}</h1>
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
            <label>Upload Pet Picture</label>
            <div id="pet-img-container">
              <img
                id="pet-img"
                src={defaultProfileImage}
                alt="profile-img"
                width={157}
                height={157}
              />
            </div>
            <input
              className="form-input-file"
              type="file"
              accept="image/*"
              onChange={UploadImage}
            />
            <label>Pet Name</label>
            <input className="form-input" type="text" />
            <label>Pet Species</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={options}
            />
            <label>Pet Breed</label>
            <CreatableSelect
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={options}
            />
            <label>Pet Description</label>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Please give a brief introduction about your pet?"
              rows={5}
              cols={50}
            />
            <label>Pet Birth Date</label>
            <input
              className="form-input"
              type="date"
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
              styles={SelectStyles}
              options={options}
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
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={options}
            />
            <label>Health Conditions</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={options}
            />
            <label>Medications</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={options}
            />
            <label>Allergies</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={options}
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
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={options}
            />
            <label>Good With</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={options}
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
        <div id="edit-form-btns">
          <input
            id="cancel-btn"
            type="submit"
            value="Cancel"
            onClick={() => {}}
            disabled={() => {}}
          />
          <input
            id="save-btn"
            type="submit"
            value="Save"
            onClick={() => {}}
            disabled={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default PetEdit;
