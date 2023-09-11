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
const PasswordModal = ({ showModal, setShowModal }) => {
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
            <h2>Password Requirements</h2>
            <ul>
              <li>
                Must contain at least <b>8 characters.</b>
              </li>
              <li>
                Must contain at least <b>1 number</b> (0-9).
              </li>
              <li>
                Must contain at least <b>1 lowercase character</b> (a-z).
              </li>
              <li>
                Must contain at least <b>1 uppercase character</b> (A-Z).
              </li>
              <li>
                Must contain at least <b>1 special character</b>{" "}
                (`~!@#$%^&*()-_+=|)
              </li>
            </ul>
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

export default PasswordModal;
