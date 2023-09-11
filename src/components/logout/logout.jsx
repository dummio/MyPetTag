/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../firebaseCommands";

/**
 * Logs user out and resets authentication.
 */
const LogOut = () => {
  let navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/", { replace: true });
    console.log("HELLOWORLD");
  });
};

export default LogOut;
