/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan, Kyle Charlton
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import AccountSettings from "../content/accountSettings/accountSettings";
import Alert from "../navigation/alert/alert";

/**
 * User Account Page
 *
 * @returns HTML Element
 */
const AccountEdit = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Alert />
      <AccountSettings />
    </React.Fragment>
  );
};

export default AccountEdit;
