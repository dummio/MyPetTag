/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import PetImg from "../../../../images/orange-cat.png";
import "./petInformation.css";
import { getPetData } from "../../../../firebaseCommands";

const PetInformation = () => {
  console.log(window.location.pathname);
  // Currently, petID is always at index 4
  const petID = window.location.pathname.split("/")[4];
  // getPetData(petID, ["name", "descr"]);

  // const [myPet] = useState({
  //   Name: "Loading...",
  //   Breed: "Loading...",
  //   Description: "Loading...",
  //   Age: "Loading...",
  //   Weight: "Loading...",
  //   Sex: "Loading...",
  // });

  const [petName, setPetName] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petDescr, setPetDescr] = useState(null);
  const [petAge, setPetAge] = useState(null);
  const [petWeight, setPetWeight] = useState(null);
  const [petSex, setPetSex] = useState(null);

  const [pet, setPet] = useState({
    Image: PetImg,
    //   Name: "Tommy",
    //   Breed: "Domestic Longhair",
    //   Description:
    //     "Testing out information text. This text should describe the animal and or provide a brief introduction about the animal.",
    //   Age: 1,
    //   Weight: 8,
    //   Sex: "Male",
  });

  useEffect(() => {
    async function fetchPetData() {
      const petData = await getPetData(petID, [
        "name",
        "breed",
        "descr",
        // "age",
        // "weight",
        "sex",
      ]);
      console.log("pet data in useEffect: ", petData);
      if (petData) {
        setPetName(petData["name"]);
        setPetBreed(petData["breed"]);
        setPetDescr(petData["descr"]);
        setPetAge("888");
        setPetWeight("888");
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
      <p className="pet-breed">{petBreed ? petBreed : "Loading..."}</p>
      <div className="pet-description">
        <p>{petDescr ? petDescr : "Loading..."}</p>
      </div>
      <div className="info-boxes-container">
        <div className="info-box">
          <p className="info-box-title">Age</p>
          <p className="info-box-value">{petAge ? petAge : "Loading..."}</p>
        </div>
        <div className="info-box">
          <p className="info-box-title">Weight</p>
          <p className="info-box-value">
            {petWeight ? petWeight + " lbs" : "Loading..."}
          </p>
        </div>
        <div className="info-box">
          <p className="info-box-title">Sex</p>
          <p className="info-box-value">{petSex ? petSex : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default PetInformation;
