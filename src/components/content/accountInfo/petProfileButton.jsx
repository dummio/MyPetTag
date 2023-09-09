/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

import { Link } from "react-router-dom";

// Import CSS
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="pet-profile-button">
        <p>{this.state.name}</p>
        <Link to={`../pet/${this.state.petId}/profile/`}>
          <FontAwesomeIcon
            style={{ fontSize: "20px", marginRight: "15px", cursor: "pointer" }}
            icon={faPen}
          />
        </Link>
      </div>
    );
  }
}
