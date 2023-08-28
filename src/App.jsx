/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Sameer Khan
 */

// Import React Modules
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import CSS
import "./App.css";

// Import Layout & Pages
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import ForgotPassword from "./components/pages/forgotPassword";
import ResetForm from "./components/forms/forgotPassword/resetForm";

const App = () => {
  return (
    <div className="body-wrapper">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetForm />} />
      </Routes>
    </div>
  );
};

export default App;
