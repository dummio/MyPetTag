/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./address.css";

//import firebase command
import { getPetData } from "../../../../firebaseCommands";

const Address = () => {
  let petAddr = getPetData(["addr"]);
  console.log(petAddr);
  //let address = "2500 N Lakeview Drive, Austin TX, 72481";
  const [address, setAddress] = useState({
    Addr: petAddr["addr"]
  });

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
        <p className="address-title">{address.Addr}</p>
      </div>
    </div>
  );
};

export default Address;
