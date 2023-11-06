/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import CSS
import "./aboutInfo.css";
import logo from "../../../images/paw.png";
import ashton from "../../../images/ashton.jpg";
import kevin from "../../../images/kevin.jpg";
import kyle from "../../../images/kyle.jpg";
import sameer from "../../../images/sameer.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAndroid,
  faApple,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const AboutInfo = () => {
  return (
    <div id="about-container">
      <img
        className="logo"
        src={logo}
        alt="MyPetTag"
        width={250}
        height={250}
      />
      <div className="company-title">
        My<span style={{ color: "#75af96" }}>PetTag</span>
      </div>
      <div id="company-about">
        <h2>Mission:</h2>
        <p>
          MyPetTag provides pet owners with an smart pet tag solution, its goal
          being to reunite owners with their lost pets while providing the best
          care possible. MyPetTag users create a detailed pet profile that
          displays current and relevant information to anyone who finds their
          furry friend. By sharing information such as basic information, health
          information, behavior information, and preferred Veterinarian.
          MyPetTag is able to give owners and finders ease of mind knowing that
          their pet will receive the best care possible.
        </p>
        <h2>Technology:</h2>
        <p>
          MyPetTag does this through the use of modern web and mobile
          technologies. At its core MyPetTag uses React.js and Firebase to
          deliver a stable SaaS product to its users. By opting to use dynamic
          web technology such as React.js we are able to deliver users a
          seamless experience while allowing anyone with a smartphone the
          ability to scan and view pet profiles around the world. MyPetTag
          offers users the ability to view and manage their pet profiles and
          account from their phone through the use of our Mobile App, which is
          available on both iOS and Android.
        </p>
        <h2>Download:</h2>
        <ul>
          <li>
            <a href="">
              MyPetTag iOS <FontAwesomeIcon icon={faApple} />
            </a>
          </li>
          <li>
            <a href="">
              MyPetTag Android <FontAwesomeIcon icon={faAndroid} />
            </a>
          </li>
        </ul>
        <h2>Tutorial:</h2>
        {/* Place YouTube Video of Project Tutorial */}
        <h2>Team Members:</h2>
      </div>
      <div id="profile-cards-container">
        <div className="profile-card">
          <img
            className="profile-pic"
            src={ashton}
            alt="Ashton Foulger"
            width={150}
            height={150}
          />
          <h2>Ashton Foulger</h2>
          <h4>BS Software Development</h4>
          <div className="profile-interests">
            <p>
              DevOps Engineer @ OpenText, AWS, Kubernetes, React.js, MERN stack,
              Terraform
            </p>
          </div>
          <div className="profile-contact">
            <div className="contact-icon">
              <a href="https://github.com/FouL06">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="mailto:ashtonfoulger@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="https://www.linkedin.com/in/ashton-foulger/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        <div className="profile-card">
          <img
            className="profile-pic"
            src={kevin}
            alt="Kevin Xue"
            width={150}
            height={150}
          />
          <h2>Kevin Xue</h2>
          <h4>BS Computer Science</h4>
          <div className="profile-interests">
            <p>
              DevOps Engineer @ OpenText, AWS, Kubernetes, React.js, MERN stack,
              Terraform
            </p>
          </div>
          <div className="profile-contact">
            <div className="contact-icon">
              <a href="https://github.com/FouL06">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="mailto:ashtonfoulger@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="https://www.linkedin.com/in/ashton-foulger/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        <div className="profile-card">
          <img
            className="profile-pic"
            src={kyle}
            alt="Kyle Charlton"
            width={150}
            height={150}
          />
          <h2>Kyle Charlton</h2>
          <h4>BS Software Development</h4>
          <div className="profile-interests">
            <p>
              DevOps Engineer @ OpenText, AWS, Kubernetes, React.js, MERN stack,
              Terraform
            </p>
          </div>
          <div className="profile-contact">
            <div className="contact-icon">
              <a href="https://github.com/FouL06">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="mailto:ashtonfoulger@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="https://www.linkedin.com/in/ashton-foulger/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
        <div className="profile-card">
          <img
            className="profile-pic"
            src={sameer}
            alt="Sameer Khan"
            width={150}
            height={150}
          />
          <h2>Sameer Khan</h2>
          <h4>BS Computer Science</h4>
          <div className="profile-interests">
            <p>
              DevOps Engineer @ OpenText, AWS, Kubernetes, React.js, MERN stack,
              Terraform
            </p>
          </div>
          <div className="profile-contact">
            <div className="contact-icon">
              <a href="https://github.com/FouL06">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="mailto:ashtonfoulger@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="https://www.linkedin.com/in/ashton-foulger/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutInfo;
