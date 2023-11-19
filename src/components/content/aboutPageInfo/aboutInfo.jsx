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
          MyPetTag offers a smart pet tag solution to pet owners, with the goal
          of reuniting them with their lost pets while ensuring the best
          possible care for their furry companions. Through our dynamic web
          application, users can create a detailed pet profile for one of our
          smart pet tags. Owners can input various details about their pets,
          including basic information, health status, behavior traits, and
          preferred veterinary care. MyPetTag provides owners with the peace of
          mind that their lost pet will receive the best care from those who
          find them. When a pet goes missing, anyone who finds the lost pet can
          access valuable information about the pet by simply scanning the pet’s
          tag using a QR code scanner or NFC chip reader. This equips them to
          offer a high-quality level of care and ensures the well-being of the
          animals they treat. MyPetTag not only benefits pet owners and those
          who find lost pets but also streamlines the process for veterinary
          professionals, granting them access to crucial information for
          providing optimal care.
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
          <h4>BS/MS Computer Science</h4>
          <div className="profile-interests">
            <p>
              Software Engineer Intern @ L3Harris | gRPC, Node.js, Deep Learning
            </p>
          </div>
          <div className="profile-contact">
            <div className="contact-icon">
              <a href="https://github.com/Sameer-H-Khan">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="mailto:khan.sameerh2002@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
            <div className="contact-icon">
              <a href="https://www.linkedin.com/in/sameer-khan-uofu/">
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
