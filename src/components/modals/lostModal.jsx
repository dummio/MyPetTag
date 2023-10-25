/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React
import React from "react";

// Import CSS
import "./lostModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faX } from "@fortawesome/free-solid-svg-icons";

// Import Firebase Commands
import { sendFoundPetEmail } from "../../emailJSCommands";
import { writeUserAlert } from "../../firebaseCommands";

/**
 * Show modal for password requirements.
 *
 * @param boolean Show Modal
 * @returns HTML element
 */
const LostModal = ({
  userID,
  petID,
  showModal,
  setShowModal,
  petName,
  healthConditions,
}) => {
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
  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="lost-modal-content">
            <h3>
              <span style={{ color: "red", fontSize: "26px" }}>
                <FontAwesomeIcon icon={faCircleExclamation} />{" "}
              </span>
              {petName} Is Currently Lost!
            </h3>
            {healthConditions?.length === 0 ? null : (
              <p style={{ margin: "0px 6px 0px 6px" }}>
                <b>{petName}</b> has the following health conditions:
              </p>
            )}
            <div
              className="health-info-values"
              style={{ margin: "0px 6px 0px 6px" }}
            >
              {healthConditions?.map((info) => (
                <span className="health-info-tag">{info}</span>
              ))}
            </div>
            <p style={{ margin: "0px 6px 0px 6px" }}>
              If you have found this pet please consider sharing your location,
              or find a nearby vet office.
            </p>
            <>
              <input
                style={{ marginTop: "12px" }}
                id="notify-btn"
                type="submit"
                value="Share Location"
                onClick={GetLocation}
              />
              <input
                style={{ marginBottom: "12px" }}
                id="sos-btn"
                type="submit"
                value="Find Emergency Vet"
                onClick={Emergency}
              />
            </>
            <FontAwesomeIcon
              icon={faX}
              className="close-modal"
              onClick={(e) => {
                setShowModal((prev) => !prev);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default LostModal;
