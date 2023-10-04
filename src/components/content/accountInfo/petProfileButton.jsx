/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";

import { Link, useNavigate } from "react-router-dom";

// Import CSS
import {
  faEye,
  faPen,
  faPenToSquare,
  faX,
} from "@fortawesome/free-solid-svg-icons";
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
      deleting: props.deleting,
    };
  }

  handleDeleteClick = () => {
    if (this.state.deleting) {
      // Set the selected pet for deletion and show the confirmation pop-up
      this.props.setSelectedPet({
        id: this.state.petId,
        name: this.state.name,
      });
      this.props.setShowConfirmation(true);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.deleting !== this.props.deleting) {
      // Update the state when deleting prop changes
      this.setState({ deleting: this.props.deleting });
    }
  }

  render() {
    return (
      <div>
        <Link
          className={`pet-profile-button-link ${
            this.state.deleting ? "deleting" : ""
          }`}
          to={this.state.deleting ? "#" : `../pet/${this.state.petId}/profile/`}
          onClick={this.handleDeleteClick}
        >
          <div className="pet-profile-button">
            <p>{this.state.name}</p>
            <Link
              className={`pet-profile-button-link ${
                this.state.deleting ? "deleting" : ""
              }`}
              to={
                this.state.deleting ? "#" : `../pet/${this.state.petId}/edit/`
              }
            >
              <FontAwesomeIcon
                className="pet-profile-icon-link"
                icon={this.state.deleting ? faX : faPenToSquare}
              />
            </Link>
          </div>
        </Link>
      </div>
    );
  }
}
