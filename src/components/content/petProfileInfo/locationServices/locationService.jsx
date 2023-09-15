/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import CSS
import "./locationService.css";

//import emailJSCommands
import { sendFoundPetEmail } from "../../../../emailJSCommands";


/**
 * Gets Users current location and directs them
 * to the nearest vet clinic
 *
 * @returns HTML Element
 */
const LocationService = () => {
  const GetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      sendFoundPetEmail(lat, lon);
      alert("You've alerted the owner that their pet was found at: '" + lat + ", " + lon);
    });
  };

  const Emergency = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      alert(
        "The closest emergency pet care center to your location (" +
          lat +
          ", " +
          lon +
          ") is the University Veterinary Hospital and Diagnostic Center. \
      \nAddress: 952 E 900 S, Salt Lake City, UT 84105 \
      \nPhone: 801-596-9005 \
      \n\nCall local animal control: 385-468-7387"
      );
    });
  };

  return (
    <div id="location-container">
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
    </div>
  );
};

export default LocationService;
