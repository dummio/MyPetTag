/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import CSS
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./health.css";

const HealthInformation = () => {
  return (
    <div id="health-container">
      <div
        id="health-tile"
        onClick={() => {
          alert("This feature is not yet implemented.");
        }}
      >
        <p id="health-title">Health Information</p>
        <FontAwesomeIcon
          style={{ fontSize: "20px", paddingRight: "15px", cursor: "pointer" }}
          icon={faChevronDown}
        />
      </div>
    </div>
  );
};

export default HealthInformation;
