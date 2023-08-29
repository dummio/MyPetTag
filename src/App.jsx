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
import User from "./components/user/user";
import UserId from "./components/user/userId";
import Account from "./components/pages/account";
import NotFound from "./components/pages/404";
import PetProfile from "./components/pages/petProfile";
import PetId from "./components/pets/petId";
import PetProfileEdit from "./components/pages/petProfileEdit";

const App = () => {
  return (
    <div className="body-wrapper">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetForm />} />
        <Route path="/user" element={<User />}>
          <Route path=":userId" element={<UserId />}>
            <Route path="profile" element={<PetProfile />}>
              <Route path=":petId" element={<PetId />}>
                <Route path="edit" element={<PetProfileEdit />} />
              </Route>
            </Route>
            <Route path="account" element={<Account />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
