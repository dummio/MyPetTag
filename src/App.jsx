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
import Shop from "./components/pages/shop";
import User from "./components/user/user";
import Tag from "./components/tag/tag";
import TagId from "./components/tag/tagId";
import Account from "./components/pages/account";
import NotFound from "./components/pages/404";
import PetProfile from "./components/pages/petProfile";
import PetId from "./components/pets/petId";
import PetProfileEdit from "./components/pages/petProfileEdit";
import LogOut from "./components/logout/logout";
import InputCode from "./components/pages/tagCodeInput";
import PetRegister from "./components/pages/petRegister";
import AccountEdit from "./components/pages/accountEdit";

const App = () => {
  return (
    <div className="body-wrapper">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetForm />} />
        <Route path="/input-code" element={<InputCode />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/tag" element={<Tag />}>
          <Route path=":tagId" element={<TagId />}>
            <Route path="profile" element={<PetProfile />} />
            <Route path="create" element={<PetRegister />} />
          </Route>
        </Route>
        <Route path="/user" element={<User />}>
          <Route path="pet/:petId" element={<PetId />}>
            <Route path="profile" element={<PetProfile />} />
            <Route path="edit" element={<PetProfileEdit />} />
          </Route>
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<AccountEdit />} />
          {/* <Route path="create" element={<PetRegister />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
