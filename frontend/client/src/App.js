import Register from "./views/pages/Register/Register.js";
import Login from "./views/pages/Login/Login.js";
import Profile from "./views/pages/Profile/Profile.js";
import React from "react";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/noauth" element={<h1>ERROR!</h1>} />
    </Routes>
  );
}
