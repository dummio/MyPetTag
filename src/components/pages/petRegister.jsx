/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import PetCreate from "../forms/petCreate/petCreate";
import { useNavigate } from "react-router-dom";

import { getUserAndPetIDFromTag } from "../../firebaseCommands";

/**
 * Pet Register Page
 *
 * @returns HTML Element
 */
const PetRegister = () => {
  const [pID, setPID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (window.location.pathname.split("/")[1] == "tag") {
          const ids = await getUserAndPetIDFromTag(
            window.location.pathname.split("/")[2]
          );
          setPID(ids[1]);
        } else {
          // const userData = await getUserData();
          // const uid = userData[0].uid;
          // setUID(uid);
          setPID(window.location.pathname.split("/")[3]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log("PID THAT WE GOT: ", pID);
  const navigate = useNavigate();
  if (pID !== "empty") {
    navigate("/");
  }

  return (
    <React.Fragment>
      <NavBar />
      <PetCreate />
    </React.Fragment>
  );
};

export default PetRegister;
