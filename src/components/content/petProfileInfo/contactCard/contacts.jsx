/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contacts.css";

const Contacts = () => {
  const [contact, setContact] = useState({
    Name: "Tommy",
    Phone: "801-858-6969",
  });

  // const contact2 = {
  //   Name: "Pet Sitter",
  //   Phone: "801-420-8569",
  // };

  return (
    <div id="contacts-container">
      <div className="contacts-label-container">
        <p>Contacts</p>
      </div>
      <div className="contact-tile">
        <p className="contact-title">{contact.Name}</p>
        <p className="contact-phone">
          <FontAwesomeIcon
            style={{ color: "#000000", fontSize: "18px", paddingRight: "10px" }}
            icon={faPhone}
          />
          {contact.Phone}
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
