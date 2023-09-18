/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React
import React from "react";

// Import CSS
import logo from "../../../images/paw.png";
import selectStyles from "../selectStyles/selectStyles";
import "./petCreate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Import Modules
import Select from "react-select";
import Animate from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const PetCreate = () => {
  const PetTypes = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Other", label: "Other" },
  ];
  const PetBreeds = [];
  const PetSex = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
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
        <label>Pet Name</label>
        <input className="form-input" type="text" placeholder="Max" />
        <label>Pet Type</label>
        <Select
          isClearable
          isSearchable
          closeMenuOnSelect={true}
          placeholder="Dog"
          styles={selectStyles}
          options={PetTypes}
        />
        <label>Pet Breed</label>
        <CreatableSelect
          isClearable
          isSearchable
          closeMenuOnSelect={true}
          placeholder="Stafforshire Terrier"
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
          placeholder="2"
          style={{ appearance: "textfield" }}
        />
        <label>Pet Weight</label>
        <input
          className="form-input"
          type="number"
          placeholder="50"
          style={{ appearance: "textfield" }}
        />
        <label>Pet Sex</label>
        <Select
          isClearable
          isSearchable
          closeMenuOnSelect={true}
          placeholder="Male"
          styles={selectStyles}
          options={PetSex}
        />
        <div id="form-contacts-container">
          <label>Contacts</label>
          <FontAwesomeIcon icon={faPlus} style={{ height: "25px" }} />
        </div>
        {/* {Wrap in map to dynamically add more contacts} */}
        <input className="form-input" type="text" placeholder="Name" />
        <input className="form-input" type="text" placeholder="Phone Number" />
        {/*------------------------------------------------------------------*/}
        <label>Address</label>
        <input
          className="form-input"
          type="text"
          placeholder="1234 Park Ave, City, TX 12345"
        />
        <label>Health Information</label>
        <label>Behavior Information</label>
        <label>Veterinarian Information</label>
        <input className="form-input" type="text" placeholder="Vet Name" />
        <input className="form-input" type="text" placeholder="Vet Phone" />
        <input className="form-input" type="text" placeholder="Vet Address" />
        <input
          className="form-input"
          type="text"
          placeholder="Vet License ID"
        />
        <input className="form-input" type="text" placeholder="Microchip ID" />
      </form>
    </div>
  );
};

export default PetCreate;
