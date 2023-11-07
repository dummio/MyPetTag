/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./health.css";
import { getPetData } from "../../../../firebaseCommands";

/**
 * Has Not been Implemented Yet
 *
 * @returns HTML Element
 */
const HealthInformation = ({ userID, petID }) => {
  // Render States
  const [hide, show] = useState(false);

  // Pet Health Info States
  const [vaccines, setVaccines] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [healthInfo, setHealthInfo] = useState("");
  const [pdfURL, setPdfURL] = useState("");
  //const petID = window.location.pathname.split("/")[4];

  const ExpandTile = () => {
    show(!hide);
    let healthTile = document.getElementById("health-tile");
    let healthTitleCon = document.getElementById("health-title-container");
    if (healthTile !== null && healthTitleCon !== null && !hide) {
      healthTile.style.flexDirection = "column";
      healthTitleCon.style.paddingTop = "15px";
    } else {
      healthTile.style.flexDirection = "row";
      healthTitleCon.style.paddingTop = "0px";
    }
  };

  useEffect(() => {
    async function fetchPetData() {
      const petHealth = await getPetData(userID, petID, [
        "vaccines",
        "conds",
        "meds",
        "allergies",
        "healthInfo",
        "medicalUrl",
      ]);

      if (petHealth) {
        setVaccines(petHealth["vaccines"]);
        setConditions(petHealth["conds"]);
        setMedications(petHealth["meds"]);
        setAllergies(petHealth["allergies"]);
        setHealthInfo(petHealth["healthInfo"]);
        setPdfURL(petHealth["medicalUrl"]);
      }
    }
    fetchPetData();
  }, []);

  return (
    <div id="health-container">
      <div id="health-tile">
        <div id="health-title-container" onClick={ExpandTile}>
          <p id="health-title">Health Information</p>
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
          <div id="health-info-container">
            <p className="health-info-label">Vaccines:</p>
            <div className="health-info-values">
              {vaccines.map((info) => (
                <span className="health-info-tag">{info}</span>
              ))}
            </div>
            <p className="health-info-label">Health Conditions:</p>
            <div className="health-info-values">
              {conditions.map((info) => (
                <span className="health-info-tag">{info}</span>
              ))}
            </div>
            <p className="health-info-label">Medications:</p>
            <div className="health-info-values">
              {medications.map((info) => (
                <span className="health-info-tag">{info}</span>
              ))}
            </div>
            <p className="health-info-label">Allergies:</p>
            <div className="health-info-values">
              {allergies.map((info) => (
                <span className="health-info-tag">{info}</span>
              ))}
            </div>
            <p className="health-info-label">Additional Information:</p>
            <div className="health-info-text">
              <p>{healthInfo}</p>
            </div>
            {/* Add the Medical History File link */}
            {pdfURL && (
              <p className="health-info-label">
                <a href={pdfURL} target="_blank" rel="noopener noreferrer">
                  Medical History File
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthInformation;
