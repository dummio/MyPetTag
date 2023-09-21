/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import CSS
import logo from "../../../images/paw.png";
import "./tagCodeInputForm.css";

//import firebase command
import { checkTagIdTaken } from "../../../firebaseCommands";

const TagCodeInputEditForm = () => {
  const [tagCode, setTagCodeReg] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [tagContent, setTagContent] = useState(null);

  const ValidateForm = () => {
    let isValid = false;
    if (tagCode) {
        isValid = true;
    }
    setCanSubmit(isValid);
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");

    if (tagCode === "") {
      if (errorText !== null) {
        errorText.innerHTML = "Please Enter Tag Code";
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

  useEffect(ValidateForm, [tagCode]);

  const navigate = useNavigate();

  async function fetchTagContent() {
    const content = await checkTagIdTaken(tagCode);
    if (content) {
      setTagContent(content);
    }
  }

  function route() {
    if(tagContent == null || (tagContent[0] == '' && tagContent[1] == '')) {
      console.log(tagContent);
      navigate("/register", {replace: true});
    }
    else {
      console.log("Tag was taken or tag code input error");
    }
  }

  const isTagTaken = (e) => {
    e.preventDefault();
    if (canSubmit) {
      console.log("TAG CODE ENTERED: ", tagCode);
      //query tag database, if tag is taken we need to throw some error to catch here
      //if response is not error -> route to user reg/pet reg
      fetchTagContent(tagCode);
      console.log(tagContent);
      route();
    }
    else {
      console.log("NO TAG CODE ENTERED!");
    }
  };

  return (
    <div id="input-container">
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
      <form id="code-input-form">
        <label>MyPetTag Code</label>
        <input
          className="form-input"
          type="text"
          onChange={(e) => {
            setTagCodeReg(e.target.value);
          }}
        />
        <div id="error-container">
          <p></p>
        </div>
        <input
          id="submit-btn"
          type="submit"
          value="Submit"
          onClick={isTagTaken}
        />
      </form>
    </div>
  );
};

export default TagCodeInputEditForm;
