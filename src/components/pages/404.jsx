/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";

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
        }}
      >
        <h1
          style={{
            fontSize: "128px",
            fontWeight: "bold",
            margin: "48px 0px 48px 0px",
          }}
        >
          404
        </h1>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            margin: "0px",
          }}
        >
          Route Not Found
        </h1>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
