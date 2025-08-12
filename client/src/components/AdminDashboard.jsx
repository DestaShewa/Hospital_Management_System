// src/components/AdminDashboard.jsx

import React from "react";
import ManageDoctors from "./ManageDoctors"; // 1. Import the new component

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-purple-100 border-2 border-purple-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Control Panel</h2>

      {/* 2. Render the ManageDoctors component here */}
      <ManageDoctors />

      {/* You can add other admin components here in the future */}
    </div>
  );
};

export default AdminDashboard;
