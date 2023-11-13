/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect, useContext } from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import PetInformation from "../content/petProfileInfo/petProfileInfo/petInformation";
import Contacts from "../content/petProfileInfo/contactCard/contacts";
import Address from "../content/petProfileInfo/addressCard/address";
import HealthInformation from "../content/petProfileInfo/healthCard/health";
import BehaviorInformation from "../content/petProfileInfo/behaviorCard/behavior";
import VetProvider from "../content/petProfileInfo/vetProviderCard/vetProvider";
import LocationService from "../content/petProfileInfo/locationServices/locationService";
import {
  getUserAndPetIDFromTag,
  writeUserAlert,
  getPetData,
  isUserAuthenticated,
} from "../../firebaseCommands";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/paw.png";
import { RememberTagContext } from "../providers/rememberTagProvider";

/**
 * Pet Profile Page
 *
 * @returns HTML Element
 */
const PetProfile = () => {
  const [uID, setUID] = useState(null);
  const [pID, setPID] = useState(null);
  const [authed, setAuthed] = useState(null);

  const { rememberedTag, setRemeberedTag } = useContext(RememberTagContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (window.location.pathname.split("/")[1] == "tag") {
          //send user an alert
          const ids = await getUserAndPetIDFromTag(
            window.location.pathname.split("/")[2]
          );
          setUID(ids[0]);
          setPID(ids[1]);
          const petName = await getPetData(ids[0], ids[1], ["name"]);
          const message = `${petName["name"]}'s tag was scanned`;
          await writeUserAlert(ids[0], ids[1], message);
        } else {
          setPID(window.location.pathname.split("/")[3]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchAuth() {
      const isAuthed = await isUserAuthenticated();
      setAuthed(isAuthed);
    }
    fetchAuth();
  }, []);

  console.log("PID THAT WE GOT: ", pID);
  console.log("UID THAT WE GOT: ", uID);
  const navigate = useNavigate();

  if (pID === "empty" && window.location.pathname.split("/")[1] === "tag") {
    // If the user is authenticated, navigate straight to pet creation
    if (authed) {
      return (
        <React.Fragment>
          <NavBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flex: "1 1 auto",
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
            <p
              style={{
                fontSize: "24px",
                textAlign: "center",
                maxWidth: "500px",
              }}
            >
              You scanned a new tag!{" "}
              <Link
                to="../create"
                // onClick={() => navigate("../create", { replace: true })}
                style={{
                  textDecoration: "none",
                  borderBottom: "2px solid #0f5738",
                  color: "black",
                }}
              >
                Click here to create a pet profile associated with this tag.
              </Link>
            </p>
          </div>
        </React.Fragment>
      );
      // navigate("../create", { replace: true });
    }
    // Otherwise, navigate to the home page with the tagID as a query param
    else {
      console.log("NON AUTHED THINGYMABOBERUNK");
      // Extract the desired query parameter value
      const scannedTagID = window.location.pathname.split("/")[2];

      console.log("The remmebered tag in petProfile.jsx: ", rememberedTag);
      setRemeberedTag(scannedTagID);
      console.log(
        "The remmebered tag in petProfile.jsx (after setting): ",
        rememberedTag
      );

      // // Create a URL object from the current URL
      // const url = new URL(window.location.href);

      // // Set the query parameter with the extracted value
      // url.search = `parameterName=${scannedTagID}`;

      // // Navigate to the new URL with the added query parameter
      // navigate(`/?scannedTag=${scannedTagID}`, { replace: true });
      return (
        <React.Fragment>
          <NavBar />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flex: "1 1 auto",
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
            <p
              style={{
                fontSize: "24px",
                textAlign: "center",
                maxWidth: "500px",
              }}
            >
              You scanned a new tag!{" "}
              <Link
                to="/"
                // onClick={() => navigate("../create", { replace: true })}
                style={{
                  textDecoration: "none",
                  borderBottom: "2px solid #0f5738",
                  color: "black",
                }}
              >
                Click here to login to create a pet profile associated with this
                tag.
              </Link>
            </p>
          </div>
        </React.Fragment>
      );
    }
  }

  if (pID === "not found") {
    console.log("where am I");
    return (
      <React.Fragment>
        <NavBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: "1 1 auto",
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
          <p
            style={{ fontSize: "24px", textAlign: "center", maxWidth: "500px" }}
          >
            Uh oh! The pet you're trying to view was not found.{" "}
            <Link
              to="/"
              onClick={() => navigate("/")}
              style={{
                textDecoration: "none",
                borderBottom: "2px solid #0f5738",
                color: "black",
              }}
            >
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
