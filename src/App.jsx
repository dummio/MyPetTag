/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Layout & Pages
import Login from "./components/pages/login";

// Import CSS
import "./App.css";

const App = () => {
  return (
    <div className="body-wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
