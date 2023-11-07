/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React
import React from "react";

// Import CSS
import "./loadingModal.css";

const LoadingModal = ({ showModal, setShowModal }) => {
  return <>{showModal ? <div id="load" /> : null}</>;
};

export default LoadingModal;
