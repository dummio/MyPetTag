/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import logo from "../../../images/paw.png";
import "./petProfileEditForm.css";

// Import Modules
import Select from "react-select";
import Animate from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const PetProfileEditForm = () => {
  const animateOptions = Animate();
  const options = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" },
    { value: "test4", label: "test4" },
  ];

  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={animateOptions}
        isMulti
        options={options}
      />
      <CreatableSelect
        isClearable
        closeMenuOnSelect={false}
        components={animateOptions}
        isMulti
        options={options}
      />
    </>
  );
};

export default PetProfileEditForm;
