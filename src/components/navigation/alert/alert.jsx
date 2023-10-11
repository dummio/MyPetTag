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
import { readUserAlerts, deleteAlert } from "../../../firebaseCommands";
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

  async function deleteMessage(msgID) {
    let newAlerts = await deleteAlert(msgID);
    if(newAlerts) {
      setMessages(newAlerts);
    }
    else {
      setMessages([]);
    }
  }

  return (
    <div id="alert-container">
      <div className="alert-menu-container" onClick={() => show(!hide)}>
        <div className="alert-icon-container">
          <FontAwesomeIcon icon={faBell} />
        </div>
        {hide && (
          <div className="alert-menu">
            {messages.map((msg) => {
              return (
                <div className="alert-item">
                  <p>
                    {msg.time} {msg.pet.name} : {msg.msg}
                  </p>
                  <div>
                    <FontAwesomeIcon
                      className="alert-close"
                      icon={faX}
                      onClick={() => deleteMessage(msg.id)}
                    />
                  </div>
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
