// src/components/PatientDashboard.jsx

import React from "react";
import BookAppointment from "./BookAppointment"; // 1. Import BookAppointment
import MyAppointments from "./MyAppointments"; // 2. Import MyAppointments

const PatientDashboard = () => {
  return (
    <div className="p-6 bg-blue-100 border-2 border-blue-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side for booking */}
        <div>
          <BookAppointment />
        </div>

        {/* Right side for viewing */}
        <div>
          <MyAppointments />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
