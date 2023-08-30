/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState } from "react";

// Import CSS
import PetImg from "../../../../images/orange-cat.png";
import "./petInformation.css";

const PetInformation = () => {
  const [pet, setPet] = useState({
    Image: PetImg,
    Name: "Tommy",
    Breed: "Domestic Longhair",
    Description:
      "Testing out information text. This text should describe the animal and or provide a brief introduction about the animal.",
    Age: 1,
    Weight: 8,
    Sex: "Male",
  });

  return (
    <div id="pet-information-container">
      <img
        className="pet-img"
        src={pet.Image}
        alt="Pet Img"
        width={157}
        height={157}
      />
      <p className="pet-name">{pet.Name}</p>
      <p className="pet-breed">{pet.Breed}</p>
      <div className="pet-description">
        <p>{pet.Description}</p>
      </div>
      <div className="info-boxes-container">
        <div className="info-box">
          <p className="info-box-title">Age</p>
          <p className="info-box-value">{pet.Age}</p>
        </div>
        <div className="info-box">
          <p className="info-box-title">Weight</p>
          <p className="info-box-value">{pet.Weight + " lbs"}</p>
        </div>
        <div className="info-box">
          <p className="info-box-title">Sex</p>
          <p className="info-box-value">{pet.Sex}</p>
        </div>
      </div>
    </div>
  );
};

export default PetInformation;
