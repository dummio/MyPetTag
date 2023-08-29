/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

import Axios from "axios";

// Import CSS
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contacts.css";

const SERVER_URI = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:3001";

const Contacts = () => {
  const [contact, setContact] = useState({
    Name: "Tommy",
    Phone: "801-858-6969",
  });

  useEffect(() => {
    Axios.get(SERVER_URI + "/profile").then((response) => {
      setContact({
        ...contact,
        Name: response.data[0].nickname,
        Phone: response.data[0].contactPhone
          ? response.data[0].contactPhone
          : "",
      });
    });
  }, []);

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
