/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import PetInformation from "../content/petProfileInfo/petProfileInfo/petInformation";
import Contacts from "../content/petProfileInfo/contactCard/contacts";
import Address from "../content/petProfileInfo/addressCard/address";
import HealthInformation from "../content/petProfileInfo/healthCard/health";
import BehaviorInformation from "../content/petProfileInfo/behaviorCard/behavior";
import VetProvider from "../content/petProfileInfo/vetProviderCard/vetProvider";
import LocationService from "../content/petProfileInfo/locationServices/locationService";
import { getUserAndPetIDFromTag, getUserData } from "../../firebaseCommands";
import { Link, useNavigate } from "react-router-dom";

/**
 * Pet Profile Page
 *
 * @returns HTML Element
 */
const PetProfile = () => {
  const [uID, setUID] = useState(null);
  const [pID, setPID] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (window.location.pathname.split("/")[1] == "tag") {
          const ids = await getUserAndPetIDFromTag(
            window.location.pathname.split("/")[2]
          );
          setUID(ids[0]);
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

  if (pID == "not found") {
    console.log("where am I");
    return (
      <React.Fragment>
        <NavBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "80vh",
            padding: "0 20px",
          }}
        >
          <p style={{ fontSize: "24px", textAlign: "center" }}>
            Uh oh! The pet you're trying to view was not found.{" "}
            <Link to="/" onClick={() => navigate("/")}>
              Click here to return to the home page.
            </Link>
          </p>
        </div>
      </React.Fragment>
    );
  } else if (pID != null) {
    console.log("kevXue", uID, pID);
    return (
      <React.Fragment>
        <NavBar />
        <PetInformation userID={uID} petID={pID} />
        <Contacts userID={uID} petID={pID} />
        <Address userID={uID} petID={pID} />
        <HealthInformation userID={uID} petID={pID} />
        <BehaviorInformation userID={uID} petID={pID} />
        <VetProvider userID={uID} petID={pID} />
        <LocationService userID={uID} petID={pID} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  }
};

export default PetProfile;
