/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./behavior.css";
import { getPetData } from "../../../../firebaseCommands";

/**
 * Gets a Pets Behavior Information
 *
 * @returns HTML Element
 */
const BehaviorInformation = () => {
  // Render States
  const [hide, show] = useState(false);

  // Pet Behavior Info States
  const [aggressions, setAggressions] = useState([]);
  const [goodWith, setGoodWith] = useState([]);
  const [behaviorInfo, setBehaviorInfo] = useState("");
  const petID = window.location.pathname.split("/")[4];

  const ExpandTile = () => {
    show(!hide);
    let behaviorTile = document.getElementById("behavior-tile");
    let behaviorTitleCon = document.getElementById("behavior-title-container");
    if (behaviorTile !== null && behaviorTitleCon !== null && !hide) {
      behaviorTile.style.flexDirection = "column";
      behaviorTitleCon.style.paddingTop = "15px";
    } else {
      behaviorTile.style.flexDirection = "row";
      behaviorTitleCon.style.paddingTop = "0px";
    }
  };

  useEffect(() => {
    async function fetchPetData() {
      const petBehavior = await getPetData(petID, [
        "aggressions",
        "goodWith",
        "behavior",
      ]);

      if (petBehavior) {
        setAggressions(petBehavior["aggressions"]);
        setGoodWith(petBehavior["goodWith"]);
        setBehaviorInfo(petBehavior["behavior"]);
      }
    }
    fetchPetData();
  }, []);

  return (
    <div id="behavior-container">
      <div id="behavior-tile">
        <div id="behavior-title-container" onClick={ExpandTile}>
          <p id="behavior-title">Behavior Information</p>
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
          <div id="behavior-info-container">
            <p className="behavior-info-label">Aggressions:</p>
            <div className="behavior-info-values">
              {aggressions.map((info) => (
                <span className="behavior-info-tag">{info}</span>
              ))}
            </div>
            <p className="behavior-info-label">Good With...</p>
            <div className="behavior-info-values">
              {goodWith.map((info) => (
                <span className="behavior-info-tag">{info}</span>
              ))}
            </div>
            <p className="behavior-info-label">Additional Information</p>
            <div className="behavior-info-text">
              <p>{behaviorInfo}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BehaviorInformation;
