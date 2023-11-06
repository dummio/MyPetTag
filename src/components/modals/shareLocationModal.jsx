/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React
import React from "react";

// Import CSS
import "./shareLocationModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faX } from "@fortawesome/free-solid-svg-icons";

/**
 * Show modal for lost pets.
 *
 * @param boolean Show Modal
 * @returns HTML element
 */
const ShareLocationModal = ({ showModal, setShowModal, lat, long }) => {
  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="share-modal-content">
            <h3>
              <span style={{ color: "#0f5738", fontSize: "26px" }}>
                <FontAwesomeIcon icon={faSmile} />{" "}
              </span>
              Shared Location
            </h3>
            <p>
              You've alerted the owner that their pet was found at your
              location:{" "}
              <b>
                {lat.toFixed(2)} , {long.toFixed(2)}
              </b>
            </p>
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

export default ShareLocationModal;
