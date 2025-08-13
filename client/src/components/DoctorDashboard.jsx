// src/components/DoctorDashboard.jsx

import React from "react";
import DoctorSchedule from "./DoctorSchedule";
import UploadLabReport from "./UploadLabReport"; // 1. Import the new component

const DoctorDashboard = () => {
  return (
    <div className="p-6 bg-green-100 border-2 border-green-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Doctor's Portal</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side for the schedule */}
        <div>
          <DoctorSchedule />
        </div>
        {/* Right side for uploading reports */}
        <div>
          <UploadLabReport />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
