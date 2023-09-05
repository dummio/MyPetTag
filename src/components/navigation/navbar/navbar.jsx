/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";
import { isUserAuthenticated } from "../../../firebaseCommands";

// Import CSS
import "./navbar.css";

const NavBar = () => {
  const [hide, show] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // if (isUserAuthenticated) {
    //   setIsAuthed(true);
    // } else {
    //   setIsAuthed(false);
    // }
    setIsAuthed(isUserAuthenticated());
  });

  const AuthLinks = () => {
    if (isAuthed) {
      return (
        <div className="nav-menu">
          <a href="/shop">
            <h1 className="nav-menu-item">Shop</h1>
          </a>
          <a href="/">
            <h1 className="nav-menu-item">Logout</h1>
          </a>
          <a href="/account">
            <h1 className="nav-menu-item">Account</h1>
          </a>
        </div>
      );
    } else {
      return (
        <div className="nav-menu">
          <a href="/shop">
            <h1 className="nav-menu-item">Shop</h1>
          </a>
          <a href="/login">
            <h1 className="nav-menu-item">Login</h1>
          </a>
          <a href="/register">
            <h1 className="nav-menu-item">Register</h1>
          </a>
        </div>
      );
    }
  };

  return (
    <div id="navbar-container">
      <div className="navbar-menu-container" onClick={() => show(!hide)}>
        <div className="navbar-dot" />
        <div className="navbar-dot" />
        <div className="navbar-dot" />
        {hide && <AuthLinks />}
      </div>
    </div>
  );
};

export default NavBar;
