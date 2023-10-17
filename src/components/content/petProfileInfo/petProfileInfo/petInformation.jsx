/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import PetImg from "../../../../images/pitbull.png";
import DefaultImg from "../../../../images/profile-default.png";
import "./petInformation.css";
import { getPetData } from "../../../../firebaseCommands";

import { useNavigate } from "react-router-dom";
import { partial, set } from "lodash";

/**
 * Gets all current Pet Information For the Pet Profile.
 *
 * @returns HTML Element
 */
const PetInformation = ({ userID, petID }) => {
  //const petID = window.location.pathname.split("/")[4];
  const navigate = useNavigate();

  const [petName, setPetName] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petDescr, setPetDescr] = useState(null);
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState(null);
  const [petSex, setPetSex] = useState(null);
  const [petImage, setPetImage] = useState(null);
  const [petIsLost, setIsLost] = useState(false);

  const calculateAge = (date) => {
    let dateObj = new Date(date);
    let currDate = new Date();
    let currAge = currDate.getFullYear() - dateObj.getFullYear();
    if (
      currDate.getMonth() < dateObj.getMonth() ||
      (currDate.getMonth() === dateObj.getMonth() &&
        currDate.getDate() < dateObj.getDate())
    ) {
      return currAge - 1;
    } else {
      return currAge;
    }
  };

  function calculateAgeFromDoB(date) {
    var dob = new Date(date);
    var today = new Date();
    var allYears = today.getFullYear() - dob.getFullYear();
    var partialMonths = today.getMonth() - dob.getMonth();
    if (partialMonths < 0) {
      allYears--;
      partialMonths = partialMonths + 12;
    }

    let age;
    if (allYears <= 0) {
      age = partialMonths;
      if (partialMonths === 0 || partialMonths > 1) age += " Months";
      else age += " Month";
    } else {
      age = allYears;
      if (allYears === 1) age += " Year";
      else age += " Years";
    }

    return age + " Old";
  }

  useEffect(() => {
    async function fetchPetData() {
      const petData = await getPetData(userID, petID, [
        "name",
        "breed",
        "descr",
        "birthDate",
        "weight",
        "sex",
        "imageUrl",
        "isLost",
      ]).catch((error) => {
        navigate("/*", { replace: true });
      });
      console.log("WHAT", petID);
      if (petData) {
        setPetName(petData["name"]);
        setPetBreed(petData["breed"]);
        setPetDescr(petData["descr"]);
        let bd = petData["birthDate"];
        if (bd) {
          let age = calculateAge(petData["birthDate"]);
          setPetAge(age);
        } else {
          setPetAge("N/A");
        }
        setPetWeight(petData["weight"]);
        setPetSex(petData["sex"]);
        setPetImage(petData["imageUrl"]);
        setIsLost(petData["isLost"]);
      }
    }
    fetchPetData();
  }, [userID, petID]);

  return (
    <div id="pet-information-container">
      <img
        className="pet-img"
        src={petImage ? petImage : DefaultImg}
        alt="Pet Img"
        width={157}
        height={157}
      />
      {petIsLost != null && petIsLost != false && <p>"This pet is lost!"</p>}
      <p className="pet-name">{petName ? petName : "Loading..."}</p>
      {/*Show as lost button if uid == null then user is logged in */}
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
            {petName
              ? petAge === "N/A"
                ? petAge
                : petAge == 1
                ? petAge + " yr"
                : petAge + " yrs"
              : "Loading"}
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
