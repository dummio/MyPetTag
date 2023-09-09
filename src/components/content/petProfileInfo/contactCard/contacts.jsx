/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import CSS
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contacts.css";

//import firebase command
import { getPetData } from "../../../../firebaseCommands";

const Contacts = () => {
  const [contact, setContact] = useState(null);
  const petID = window.location.pathname.split("/")[4];

  useEffect(() => {
    async function fetchPetData() {
      const petContact = await getPetData(petID, ["contacts"]);
      if (petContact) {
        setContact(petContact["contacts"]);
      }
    }
    fetchPetData();
  }, []);

  console.log("KEVXUE@ ", contact);
  return (
    <div id="contacts-container">
      <div className="contacts-label-container">
        <p>Contacts</p>
      </div>
      <div className="contact-tile">
        <p className="contact-title">
          {contact ? contact["Name"] : "Loading..."}
        </p>
        <p className="contact-phone">
          <FontAwesomeIcon
            style={{ color: "#000000", fontSize: "18px", paddingRight: "10px" }}
            icon={faPhone}
          />
          {contact ? contact["Phone"] : "Loading..."}
        </p>
      </div>
      {/* <div className="contact-tile">
        <p className="contact-title">{contact2.Name}</p>
        <p className="contact-phone">
          <FontAwesomeIcon
            style={{ color: "#000000", fontSize: "18px", paddingRight: "10px" }}
            icon={faPhone}
          />
          {contact2.Phone}
        </p>
      </div> */}
    </div>
  );
};

export default Contacts;
