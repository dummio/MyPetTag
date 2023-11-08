/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import AboutInfo from "../content/aboutPageInfo/aboutInfo";

/**
 * Shop Page
 *
 * @returns HTML Element
 */
const About = () => {
  return (
    <React.Fragment>
      <NavBar />
      <AboutInfo />
    </React.Fragment>
  );
};

export default About;
