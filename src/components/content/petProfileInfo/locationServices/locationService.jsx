/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from "react";

// Import CSS
import "./locationService.css";

//import emailJSCommands
import { sendFoundPetEmail } from "../../../../emailJSCommands";
import {
  writeUserAlert,
  isUserAuthenticated,
  getPetData,
  setIsPetLost,
  notifyNearbyUsers,
} from "../../../../firebaseCommands";
import ShareLocationModal from "../../../modals/shareLocationModal";

/**
 * Gets Users current location and directs them
 * to the nearest vet clinic
 *
 * @returns HTML Element
 */
const LocationService = ({ userID, petID }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [buttonText, setButtonText] = useState("Show As Lost");
  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    async function getLostStatus() {
      const status = await getPetData(userID, petID, ["isLost"]);
      if (!status) {
        return null;
      }
      if (status["isLost"] != null) {
        setIsLost(status["isLost"]);
        if (status["isLost"]) {
          setButtonText("Pet Found");
        } else {
          setButtonText("Show As Lost");
        }
      }
    }
    getLostStatus();
  }, []);

  useEffect(() => {
    const getAuthState = async () => {
      const data = await isUserAuthenticated();
      setIsAuthed(data);
    };
    getAuthState();
  }, []);

  useEffect(() => {
    setShowOverlay((showOverlay) => !showOverlay);
  }, [isLost]);

  const changeIsLost = () => {
    //change to check for current status and flip -> will also need to change button text
    if (isLost) {
      setIsPetLost(petID, false);
    } else {
      setIsPetLost(petID, true);
    }
  };

  const notifyUsers = () => {
    notifyNearbyUsers(petID);
    setShowOverlay((showOverlay) => !showOverlay);
  };

  const GetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setLat(lat);
      setLong(lon);
      setShowModal((prev) => !prev);
      sendFoundPetEmail(userID, lat, lon);
      writeUserAlert(userID, petID, "Tag location shared!");
    });
  };

  const Emergency = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      let closestEmergencyVet = `https://www.google.com/maps/dir/${lat}%2C${lon}/emergency+vet`;
      writeUserAlert(userID, petID, "Emergency vet selected!");
      window.open(closestEmergencyVet, "blank_");
    });
  };

  const LocationButtons = () => {
    if (isAuthed && window.location.pathname.split("/")[1] != "tag") {
      return (
        <>
          <input
            id="lost-btn"
            type="button"
            value={buttonText}
            onClick={changeIsLost}
          />
          {isLost && showOverlay && (
            <div className="notify-overlay">
              <div className="notify-box">
                <p>Do You Want To Notify Local Users About Your Lost Pet?</p>
                <button id="yes-btn" onClick={notifyUsers}>
                  Notify
                </button>
                <button id="no-btn" onClick={() => setShowOverlay(false)}>
                  No
                </button>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <input
            id="notify-btn"
            type="submit"
            value="Share Location"
            onClick={() => {
              GetLocation();
            }}
          />
          <input
            id="sos-btn"
            type="submit"
            value="Find Emergency Vet"
            onClick={Emergency}
          />
        </>
      );
    }
  };

  return (
    <div id="location-container">
      <LocationButtons />
      <ShareLocationModal
        showModal={showModal}
        setShowModal={setShowModal}
        lat={lat}
        long={long}
      />
    </div>
  );
};

export default LocationService;
