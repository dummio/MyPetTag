/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React
import React, { useEffect, useState } from "react";

// Import CSS
import "./alert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faX } from "@fortawesome/free-solid-svg-icons";

// Import FirebaseCommands
import { readUserAlerts } from "../../../firebaseCommands";
/**
 * Shows and displays alert bucket for MyPetTag App
 *
 * @returns HTML Element
 */
const Alert = () => {
  const [hide, show] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      const tempAlerts = await readUserAlerts();
      if (tempAlerts) {
        setMessages(tempAlerts);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <div id="alert-container">
      <div className="alert-menu-container">
        <div className="alert-icon-container" onClick={() => show(!hide)}>
          <FontAwesomeIcon icon={faBell} />
        </div>
        {hide && (
          <div className="alert-menu">
            {messages.map((msg) => {
              return (
                <div className="alert-item">
                  <p style={{ fontSize: "16px" }}>
                    <b style={{ fontSize: "18px" }}>{msg.pet.name + ": "}</b>{" "}
                    {msg.msg} {"(" + msg.time + ")"}
                  </p>
                  <FontAwesomeIcon className="alert-close" icon={faX} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
