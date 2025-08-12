// src/components/MyAppointments.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      // Create the config with the authorization token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        setLoading(true);
        // Make the protected GET request
        const { data } = await axios.get(
          "http://localhost:5000/api/appointments/myappointments",
          config
        );
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
        setLoading(false);
      }
    };

    // Only fetch if userInfo is available
    if (userInfo) {
      fetchMyAppointments();
    }
  }, [userInfo]); // Re-run the effect if userInfo changes

  if (loading) {
    return <div>Loading your appointments...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">My Appointments</h3>
      {appointments.length === 0 ? (
        <p>You have no appointments scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((apt) => (
            <li key={apt._id} className="p-4 border rounded-md bg-gray-50">
              <p>
                <strong>Doctor:</strong> {apt.doctor.name}
              </p>
              <p>
                <strong>Specialization:</strong> {apt.doctor.specialization}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(apt.appointmentDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 px-2 py-1 text-sm font-semibold rounded-full ${
                    apt.status === "Scheduled"
                      ? "bg-yellow-200 text-yellow-800"
                      : apt.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {apt.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
