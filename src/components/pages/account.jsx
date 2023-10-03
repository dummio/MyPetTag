/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";

// Import Components
import NavBar from "../navigation/navbar/navbar";
import AccountInfo from "../content/accountInfo/accountInfo";
import Alert from "../navigation/alert/alert";

/**
 * User Account Page
 *
 * @returns HTML Element
 */
const Account = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Alert />
      <AccountInfo />
    </React.Fragment>
  );
};

export default Account;
