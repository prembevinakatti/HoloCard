import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import CreateProfile from "@/Pages/CreateProfile";
import HomePage from "@/Pages/HomePage";
import LandingPage from "@/Pages/LandingPage";
import ProfilePreviewPage from "@/Pages/ProfilePreviewPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/createProfile" element={<CreateProfile />} />
      <Route path="/" element={<ProfilePreviewPage />} />
    </Routes>
  );
};

export default AppRoutes;
