/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

import { Link, useNavigate } from "react-router-dom";

// Import CSS
import { faEye, faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Extends react component, dynamically pulls in pet profile ID's
 * from firebase and fills in relevant information.
 */
export default class PetProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petId: props.petId,
      name: props.name,
    };
  }

  render() {
    return (
      <Link
        className="pet-profile-button-link"
        to={`../pet/${this.state.petId}/profile/`}
      >
        <div className="pet-profile-button">
          <p>{this.state.name}</p>
          <Link
            className="pet-profile-button-link"
            to={`../pet/${this.state.petId}/edit/`}
          >
            <FontAwesomeIcon
              className="pet-profile-icon-link"
              icon={faPenToSquare}
            />
          </Link>
        </div>
      </Link>
    );
  }
}
