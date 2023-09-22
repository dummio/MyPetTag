/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React from "react";
import { Outlet } from "react-router-dom";

/**
 * tagId
 *
 * @returns tagId
 */
const tagId = () => {
  return <Outlet />;
};

export default tagId;
