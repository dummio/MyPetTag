/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import CSS
import logo from "../../images/paw.png";

// Import Componenets
import NavBar from "../navigation/navbar/navbar";

const Shop = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div
        id="shop-container"
        style={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={250}
          height={250}
        />
        <div
          id="company-title"
          style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "25px" }}
        >
          My<span style={{ color: "#75af96" }}>PetTag</span>
        </div>
        <div
          id="cards-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="card"
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "16px",
              backgroundColor: "lightgrey",
              marginBottom: "25px",
            }}
          />
          <div
            className="card"
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "16px",
              backgroundColor: "lightgrey",
              marginBottom: "25px",
            }}
          />
          <div
            className="card"
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "16px",
              backgroundColor: "lightgrey",
              marginBottom: "25px",
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shop;
