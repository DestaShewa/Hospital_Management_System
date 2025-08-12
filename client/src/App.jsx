// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage"; // Import the new dashboard page
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute

function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}></Route>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

export default App;
