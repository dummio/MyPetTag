/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import PetImg from "../../../../images/pitbull.png";
import "./petInformation.css";
import { getPetData } from "../../../../firebaseCommands";

/**
 * Gets all current Pet Information For the Pet Profile.
 *
 * @returns HTML Element
 */
const PetInformation = () => {
  console.log(window.location.pathname);
  const petID = window.location.pathname.split("/")[4];

  const [petName, setPetName] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petDescr, setPetDescr] = useState(null);
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState(null);
  const [petSex, setPetSex] = useState(null);

  const [pet, setPet] = useState({
    Image: PetImg,
  });

  useEffect(() => {
    async function fetchPetData() {
      const petData = await getPetData(petID, [
        "name",
        "breed",
        "descr",
        "birthyear",
        "weight",
        "sex",
      ]);
      console.log("pet data in useEffect: ", petData);
      if (petData) {
        setPetName(petData["name"]);
        setPetBreed(petData["breed"]);
        setPetDescr(petData["descr"]);
        setPetAge(2023 - petData["birthyear"]);
        setPetWeight(petData["weight"]);
        setPetSex(petData["sex"]);
      }
    }
    fetchPetData();
  }, []);

  return (
    <div id="pet-information-container">
      <img
        className="pet-img"
        src={pet.Image}
        alt="Pet Img"
        width={157}
        height={157}
      />
      <p className="pet-name">{petName ? petName : "Loading..."}</p>
      <p className="pet-breed">
        {petName ? (petBreed ? petBreed : "Breed not provided") : "Loading..."}
      </p>
      <div className="pet-description">
        <p>
          {petName
            ? petDescr
              ? petDescr
              : "Description not provided"
            : "Loading..."}
        </p>
      </div>
      <div className="info-boxes-container">
        <div className="info-box">
          <p className="info-box-title">Age</p>
          <p className="info-box-value">
            {petName ? (petAge ? petAge : "N/A") : "Loading"}
          </p>
        </div>
        <div className="info-box">
          <p className="info-box-title">Weight</p>
          <p className="info-box-value">
            {petName ? (petWeight ? petWeight + " lbs" : "N/A") : "Loading"}
          </p>
        </div>
        <div className="info-box">
          <p className="info-box-title">Sex</p>
          <p className="info-box-value">
            {petName ? (petSex ? petSex : "N/A") : "Loading"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetInformation;
