// src/pages/DashboardPage.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PatientDashboard from "../components/PatientDashboard";
import DoctorDashboard from "../components/DoctorDashboard";
import AdminDashboard from "../components/AdminDashboard";

const DashboardPage = () => {
  const { userInfo, logout } = useContext(AuthContext);

  if (!userInfo) {
    return <div>Loading user data...</div>;
  }

  // This function decides which dashboard component to render
  const renderDashboardByRole = () => {
    switch (userInfo.role) {
      case "Patient":
        return <PatientDashboard />;
      case "Doctor":
        return <DoctorDashboard />;
      case "Admin":
        return <AdminDashboard />;
      default:
        // If role is unknown or not set, show an error or a default view
        return <div>Invalid user role. Please contact support.</div>;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userInfo.name}!</h1>
          <p className="mt-1 text-lg">
            Logged in as: <strong>{userInfo.role}</strong>
          </p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Render the specific dashboard based on the user's role */}
      {renderDashboardByRole()}
    </div>
  );
};

export default DashboardPage;
