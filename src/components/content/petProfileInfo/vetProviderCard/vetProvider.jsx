/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./vetProvider.css";

const SERVER_URI = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:3001";

const VetProvider = () => {
  const [hide, show] = useState(false);

  // const vet = {
  //   Name: "Dr. Mike",
  //   Phone: "(385) 498-4500",
  //   Address: "424 Alpine Highway, Alpine Utah, 84004",
  //   License: "8569872290",
  //   Microchip: "21876859009",
  // };

  const [vet, setVet] = useState({
    Name: "Dr. Mike",
    Phone: "(385) 498-4500",
    Address: "424 Alpine Highway, Alpine Utah, 84004",
    License: "8569872290",
    Microchip: "21876859009",
  });

  const ExpandTile = () => {
    show(!hide);
    let vetTile = document.getElementById("vet-tile");
    let vetTitleCon = document.getElementById("vet-title-container");
    if (vetTile != null && vetTitleCon != null && !hide) {
      vetTile.style.height = "auto";
      vetTile.style.flexDirection = "column";
      vetTitleCon.style.paddingTop = "15px";
    }
    if (vetTile != null && vetTitleCon != null && hide) {
      vetTile.style.height = "57px";
      vetTile.style.flexDirection = "row";
      vetTitleCon.style.paddingTop = "0px";
    }
  };

  return (
    <div id="vet-container">
      <div id="vet-tile">
        <div id="vet-title-container" onClick={ExpandTile}>
          <p id="vet-title">Veterinary Provider</p>
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              paddingRight: "15px",
              cursor: "pointer",
            }}
            icon={faChevronDown}
          />
        </div>
        {hide && (
          <div id="vet-info-container">
            <p className="vet-info-label">Veterinarian:</p>
            <p className="vet-info-value">{vet.Name}</p>
            <p className="vet-info-label">Veterinarian Phone:</p>
            <p className="vet-info-value">{vet.Phone}</p>
            <p className="vet-info-label">Veterinarian Address:</p>
            <p className="vet-info-value">{vet.Address}</p>
            <p className="vet-info-label">Veterinarian License ID:</p>
            <p className="vet-info-value">{vet.License}</p>
            <p className="vet-info-label">Microchip ID:</p>
            <p className="vet-info-value">{vet.Microchip}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VetProvider;
