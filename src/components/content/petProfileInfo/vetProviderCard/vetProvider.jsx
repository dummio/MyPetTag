/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import CSS
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./vetProvider.css";

//import firebase command
import { getPetData } from "../../../../firebaseCommands";

/**
 * Gets a Pets Vet information to display as part
 * of the vet provider card in the pet profile.
 *
 * @returns HTML Element
 */
const VetProvider = () => {
  const [hide, show] = useState(false);

  const [vet, setVet] = useState(null);
  const petID = window.location.pathname.split("/")[4];

  useEffect(() => {
    async function fetchPetData() {
      const petVet = await getPetData(petID, ["vets"]);
      if (petVet) {
        setVet(petVet["vets"]);
      }
    }
    fetchPetData();
  }, []);

  const ExpandTile = () => {
    show(!hide);
    async function fetchPetData() {
      const petVet = await getPetData(petID, ["vets"]);
      if (petVet) {
        setVet(petVet["vets"]);
      }
    }
    fetchPetData();
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
            <p className="vet-info-value">
              {vet ? (vet["name"] ? vet["name"] : "N/A") : "Loading..."}
            </p>
            <p className="vet-info-label">Veterinarian Phone:</p>
            <p className="vet-info-value">
              {vet ? (vet["phone"] ? vet["phone"] : "N/A") : "Loading..."}
            </p>
            <p className="vet-info-label">Veterinarian Address:</p>
            <p className="vet-info-value">
              {vet ? (vet["addr"] ? vet["addr"] : "N/A") : "Loading..."}
            </p>
            <p className="vet-info-label">Veterinarian License ID:</p>
            <p className="vet-info-value">
              {vet
                ? vet["licenseId"]
                  ? vet["licenseId"]
                  : "N/A"
                : "Loading..."}
            </p>
            <p className="vet-info-label">Microchip ID:</p>
            <p className="vet-info-value">
              {vet
                ? vet["microchipId"]
                  ? vet["microchipId"]
                  : "N/A"
                : "Loading..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VetProvider;
