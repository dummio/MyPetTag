/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import "./navbar.css";

const NavBar = () => {
  const [hide, show] = useState(false);
  return (
    <div id="navbar-container">
      <div className="navbar-menu-container" onClick={() => show(!hide)}>
        <div className="navbar-dot" />
        <div className="navbar-dot" />
        <div className="navbar-dot" />
        {hide && (
          <div className="nav-menu">
            <a href="/">
              <h1 className="nav-menu-item">Home</h1>
            </a>
            <a href="/">
              <h1 className="nav-menu-item">Login</h1>
            </a>
            <a href="/register">
              <h1 className="nav-menu-item">Register</h1>
            </a>
            <a href="/user/1/profile">
              <h1 className="nav-menu-item">Pet Profile</h1>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
