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
import { onSnapshot } from "firebase/firestore";

// Import FirebaseCommands
import {
  readUserAlerts,
  deleteAlert,
  deleteAllAlerts,
  getUserDocRef,
} from "../../../firebaseCommands";
import { set } from "lodash";
/**
 * Shows and displays alert bucket for MyPetTag App
 *
 * @returns HTML Element
 */
const Alert = () => {
  const [hide, show] = useState(false);
  const [messages, setMessages] = useState([]);
  const [msgCount, setCount] = useState(0);
  const [myDoc, setDoc] = useState(null);

  useEffect(() => {
    async function fetchAlerts() {
      const tempAlerts = await readUserAlerts();
      if (tempAlerts) {
        setMessages(tempAlerts);
        setCount(tempAlerts.length);
      }
    }
    fetchAlerts();

    async function getDoc() {
      const tempDoc = await getUserDocRef();
      if (tempDoc) {
        setDoc(tempDoc);
      }
    }
    getDoc();
  }, []);

  useEffect(() => {
    if (myDoc != null) {
      const unsub = onSnapshot(
        myDoc,
        (docSnapshot) => {
          const tempAlerts = docSnapshot.data().alerts;
          setMessages(tempAlerts);
          setCount(tempAlerts?.length);
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [myDoc]);

  async function deleteMessage(msgID) {
    let newAlerts = await deleteAlert(msgID);
    if (newAlerts) {
      setMessages(newAlerts);
      setCount(newAlerts.length);
    } else {
      setMessages([]);
      setCount(0);
    }
  }

  return (
    <div id="alert-container">
      <div className="alert-menu-container" onClick={() => show(!hide)}>
        {msgCount !== 0 && <span className="bubble">{msgCount}</span>}
        <div className="alert-icon-container">
          <FontAwesomeIcon icon={faBell} />
        </div>
        {hide && (
          <div className="alert-menu">
            <div id="clear-alert-btn" onClick={() => deleteAllAlerts()}>
              <p>Clear All Alerts</p>
            </div>
            {messages.map((msg) => {
              return (
                <div className="alert-item">
                  <p style={{ fontSize: "16px" }}>
                    <b style={{ fontSize: "18px" }}>{msg.pet.name + ": "}</b>{" "}
                    {msg.msg} {"(" + msg.time + ")"}
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
