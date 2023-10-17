/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebaseCommands";

/**
 * Logs user out and resets authentication.
 */
const LogOut = () => {
  let navigate = useNavigate();

  useEffect(() => {
    logout()
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.debug("Error occurred:: ", error);
      });
  }, []);
};

export default LogOut;
