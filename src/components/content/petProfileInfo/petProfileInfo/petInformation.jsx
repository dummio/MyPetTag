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

import { useNavigate } from "react-router-dom";
import { partial } from "lodash";

/**
 * Gets all current Pet Information For the Pet Profile.
 *
 * @returns HTML Element
 */
const PetInformation = () => {
  console.log(window.location.pathname);
  const petID = window.location.pathname.split("/")[4];
  const navigate = useNavigate();

  const [petName, setPetName] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petDescr, setPetDescr] = useState(null);
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState(null);
  const [petSex, setPetSex] = useState(null);

  const [pet, setPet] = useState({
    Image: PetImg,
  });

  function calculateAgeFromDoB(date) {
    var dob = new Date(date);
    var today= new Date();
    var allYears= today.getFullYear() - dob.getFullYear();
    var partialMonths = today.getMonth() - dob.getMonth();
    if (partialMonths < 0) {
        allYears--;
        partialMonths = partialMonths + 12;
    }

    let age;
    if (allYears <= 0) {
      age = partialMonths;
      if (partialMonths === 0 || partialMonths > 1)
        age += " months";
      else
        age += " month";
    } else {
      age = allYears;
      if (allYears === 1)
        age += " year";
      else
        age += " years";
    }
  
    return age + " old";
  }

  useEffect(() => {
    async function fetchPetData() {
      const petData = await getPetData(petID, [
        "name",
        "breed",
        "descr",
        "birthyear",
        "birthDate",
        "weight",
        "sex",
      ]).catch(error => {
        navigate('/*', {replace: true});
      });
      console.log("pet data in useEffect: ", petData);
      if (petData) {
        setPetName(petData["name"]);
        setPetBreed(petData["breed"]);
        setPetDescr(petData["descr"]);
        setPetAge(calculateAgeFromDoB(petData["birthDate"]));
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
