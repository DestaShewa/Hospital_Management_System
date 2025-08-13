// src/components/MyAppointments.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import SkeletonLoader from "./SkeletonLoader"; // 1. Import the SkeletonLoader

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      // We already set loading to true initially, so we don't need to set it again here.
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/appointments/myappointments",
          config
        );
        setAppointments(data);
        // Set loading to false only after the data has been successfully fetched.
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
        // Also set loading to false if there is an error.
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyAppointments();
    }
  }, [userInfo]);

  // 2. This is the key change. We check for the loading state here.
  if (loading) {
    // If the data is loading, we return a list of skeleton placeholders.
    return (
      <div className="p-4 bg-white rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-4">
          <SkeletonLoader className="h-7 w-48" />
        </h3>
        <div className="space-y-4">
          {/* Create a few placeholder cards */}
          {[1, 2].map((n) => (
            <div key={n} className="p-4 border rounded-md bg-gray-50">
              <SkeletonLoader className="h-5 w-3/4 mb-2" />
              <SkeletonLoader className="h-5 w-1/2 mb-2" />
              <SkeletonLoader className="h-5 w-1/3 mb-2" />
              <SkeletonLoader className="h-5 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. This part only renders if loading is false.
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
