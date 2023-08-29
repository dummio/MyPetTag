/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import CSS
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./behavior.css";

const BehaviorInformation = () => {
  return (
    <div id="behavior-container">
      <div
        id="behavior-tile"
        onClick={() => {
          alert("This feature is not yet implemented.");
        }}
      >
        <p id="behavior-title">Behavior Information</p>
        <FontAwesomeIcon
          style={{ fontSize: "20px", paddingRight: "15px", cursor: "pointer" }}
          icon={faChevronDown}
        />
      </div>
    </div>
  );
};

export default BehaviorInformation;
