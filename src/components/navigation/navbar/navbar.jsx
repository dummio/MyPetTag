/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";
import {
  isUserAuthenticated,
  authStateChangedWrapper,
} from "../../../firebaseCommands";

// Import CSS
import "./navbar.css";

/**
 * Shows and displays navbar for MyPetTag App
 *
 * @returns HTML Element
 */
const NavBar = () => {
  const [hide, show] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    async function fetchUid() {
      const uid_ = await authStateChangedWrapper();
      if (uid_) {
        setUid(uid_);
      }
    }

    fetchUid().then(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

    const getAuthState = async () => {
      const data = await isUserAuthenticated();
      console.log(data);
      setIsAuthed(data);
    };

    getAuthState();
  }, []);

  /**
   * Shows links based on user authentication status
   *
   * @returns HTML Element
   */
  const AuthLinks = () => {
    const path = `/user/${uid}/account`;
    if (isAuthed == true) {
      return (
        <div className="nav-menu">
          <a href="/shop">
            <h1 className="nav-menu-item">Shop</h1>
          </a>
          <a href="/logout">
            <h1 className="nav-menu-item">Logout</h1>
          </a>
          <a href={path}>
            <h1 className="nav-menu-item">Account</h1>
          </a>
          <a href="/input-code">
            <h1 className="nav-menu-item">Input Code</h1>
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
