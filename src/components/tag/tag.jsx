/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * tag
 *
 * @returns tag Object
 */
const tag = () => {
  return <Outlet />;
};

export default tag;
