/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";

// Import CSS
import logo from "../../images/paw.png";

/**
 * Returns 404 page if route does not exists.
 *
 * @returns HTML Element
 */
const NotFound = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div
        id="404"
        style={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={250}
          height={250}
        />
        <div className="company-title">
          My<span style={{ color: "#75af96" }}>PetTag</span>
        </div>
        <h1
          style={{
            fontSize: "128px",
            fontWeight: "bold",
            margin: "0px 0px 0px 0px",
            paddingRight: "6px",
          }}
        >
          404
        </h1>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            margin: "0px",
            paddingRight: "6px",
          }}
        >
          Route Not Found
        </h1>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
