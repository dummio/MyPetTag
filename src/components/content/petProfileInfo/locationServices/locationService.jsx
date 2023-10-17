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
} from "../../../../firebaseCommands";

/**
 * Gets Users current location and directs them
 * to the nearest vet clinic
 *
 * @returns HTML Element
 */
const LocationService = ({ userID, petID }) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [buttonText, setButtonText] = useState("Show As Lost")

  useEffect(() => {
    async function getLostStatus() {
      const status = await getPetData(userID, petID, ["isLost"]);
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

  const changeIsLost = () => {
    //change to check for current status and flip -> will also need to change button text
    console.log(isLost);
    if(isLost == true) {
      setIsPetLost(petID, false);
    }
    else {
      setIsPetLost(petID, true);
    }
  }

  const GetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      sendFoundPetEmail(userID, lat, lon);
      writeUserAlert(userID, petID, "Tag location shared!");
      alert(
        "You've alerted the owner that their pet was found at: '" +
          lat +
          ", " +
          lon
      );
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

  useEffect(() => {
    const getAuthState = async () => {
      const data = await isUserAuthenticated();
      setIsAuthed(data);
    };
    getAuthState();
  }, []);

  const LocationButtons = () => {
    //TODO:: make better
    if (isAuthed && window.location.pathname.split("/")[1] != "tag") {
      return (
        <>
          <input
            id="lost-btn"
            type="button"
            value={buttonText}
            onClick={changeIsLost}
          />
        </>
      );
    } else {
      return (
      <>
        <input
          id="notify-btn"
          type="submit"
          value="Share Location"
          onClick={GetLocation}
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
    </div>
  );
};

export default LocationService;
