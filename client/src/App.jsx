// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 1. Import the Toaster

// Import Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import Page Components
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* 2. Add the Toaster component here. It's self-closing. */}
      {/* This component is invisible until we trigger a notification. */}
      <Toaster
        position="top-right" // We can configure its position
        toastOptions={{
          duration: 3000, // Notifications will last for 3 seconds
        }}
      />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
