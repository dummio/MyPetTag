/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import CSS
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contacts.css";

// Import firebase command
import { getPetData } from "../../../../firebaseCommands";

/**
 * Gets a Pets contact's information and displays it in a dynamic card.
 *
 * @returns HTML Element
 */
const Contacts = ({ userID, petID }) => {
  const [contacts, setContacts] = useState([]);
  // const petID = window.location.pathname.split("/")[4];

  useEffect(() => {
    async function fetchPetData() {
      const petContact = await getPetData(userID, petID, ["contacts"]).catch(
        (error) => {
          console.debug(error);
        }
      );
      if (petContact) {
        const contactsData = petContact["contacts"];
        if (Array.isArray(contactsData)) {
          // It's a list of contacts
          setContacts(contactsData);
        } else if (typeof contactsData === "object") {
          // It's a single contact map, convert it to a list and account
          // for old naming convention
          setContacts([
            { name: contactsData["Name"], phone: contactsData["Phone"] },
          ]);
        }
      }
    }
    fetchPetData();
  }, []);

  return (
    <div id="contacts-container">
      <div className="contacts-label-container">
        <p>Contacts</p>
      </div>
      {contacts.map((contact, index) => (
        <div key={index} className="contact-tile">
          <p className="contact-title">
            {contact
              ? contact["name"]
                ? contact["name"]
                : "N/A"
              : "Loading..."}
          </p>
          <a
            className="contact-phone"
            href={`tel:${
              contact
                ? contact["phone"]
                  ? contact["phone"]
                  : "N/A"
                : "Loading..."
            }`}
          >
            <FontAwesomeIcon
              style={{
                color: "#000000",
                fontSize: "18px",
                paddingRight: "10px",
              }}
              icon={faPhone}
            />
            {contact
              ? contact["phone"]
                ? contact["phone"]
                : "N/A"
              : "Loading..."}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
