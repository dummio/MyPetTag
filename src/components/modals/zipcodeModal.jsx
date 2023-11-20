/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React
import React from "react";

// Import CSS
import "./passwordModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

/**
 * Show modal for password requirements.
 *
 * @param boolean Show Modal
 * @returns HTML element
 */
const zipcodeModal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <div
          className="modal"
          onClick={(e) => {
            setShowModal((prev) => !prev);
          }}
        >
          <div className="overlay"></div>
          <div className="modal-content">
            <p>Zipcodes are used for helping notify nearby users when your pet is lost!</p>
            <FontAwesomeIcon icon={faX} className="close-modal" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default zipcodeModal;
