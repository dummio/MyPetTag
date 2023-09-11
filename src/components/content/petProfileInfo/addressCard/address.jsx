/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import CSS
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./address.css";

// Import firebase command
import { getPetData } from "../../../../firebaseCommands";

/**
 * Grabs information from Firebase to get Pets Home address.
 *
 * @returns HTML Element
 */
const Address = () => {
  const petID = window.location.pathname.split("/")[4];
  const [petAddr, setAddress] = useState(null);

  useEffect(() => {
    async function fetchPetData() {
      const petAddr = await getPetData(petID, ["addr"]);
      if (petAddr) {
        setAddress(petAddr["addr"]);
      }
    }
    fetchPetData();
    console.log(petAddr);
  }, []);

  return (
    <div id="address-container">
      <div className="address-label-container">
        <p>Address</p>
      </div>
      <div className="address-tile">
        <FontAwesomeIcon
          style={{
            color: "#000000",
            fontSize: "24px",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
          icon={faHouse}
        />
        <p className="address-title">{petAddr ? petAddr : "N/A"}</p>
      </div>
    </div>
  );
};

export default Address;
