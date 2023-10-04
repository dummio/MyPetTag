/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React
import React, { useState } from "react";

// Import CSS
import "./alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";

/**
 * Shows and displays alert bucket for MyPetTag App
 *
 * @returns HTML Element
 */
const Alert = () => {
  const [hide, show] = useState(false);
  return (
    <div id="alert-container">
      <div className="alert-menu-container" onClick={() => show(!hide)}>
        <span className="bubble">1</span>
        <div className="alert-icon-container">
          <FontAwesomeIcon icon={faBell} />
        </div>
        {hide && (
          <div className="alert-menu">
            <div className="alert-item">
              <p>test</p>
              <FontAwesomeIcon className="alert-close" icon={faX} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
