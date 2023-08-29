/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from "react";

// Import CSS
import PetImg from "../../../images/orange-cat.png";
import "./petInformation.css";

// Import Axios Modules
import Axios from "axios";

const SERVER_URI = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:3001";

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

  useEffect(() => {
    Axios.get(SERVER_URI + "/profile").then((response) => {
      setPet({
        ...pet,
        Name: response.data[0].name,
        Breed: response.data[0].breed ? response.data[0].breed : "",
        Description: response.data[0].descr ? response.data[0].descr : "",
        Age: response.data[0].birthYear ? 2023 - response.data[0].birthYear : 0,
        Weight: response.data[0].weight ? response.data[0].weight : 0,
        Sex: response.data[0].sex ? response.data[0].sex : "",
      });
    });
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
