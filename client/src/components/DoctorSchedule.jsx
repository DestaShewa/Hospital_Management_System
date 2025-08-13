// src/components/DoctorSchedule.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import SkeletonLoader from "./SkeletonLoader"; // Import the skeleton loader for a polished UI

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    // This function will fetch the appointments specific to the logged-in doctor
    const fetchSchedule = async () => {
      // Set loading to true at the beginning of the fetch
      setLoading(true);

      const config = {
        headers: {
          // Send the JWT token for authorization
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        // The API endpoint must exactly match what is defined in the backend routes
        const { data } = await axios.get(
          "http://localhost:5000/api/appointments/doctor",
          config
        );

        // On success, update the schedule state with the fetched data
        setSchedule(data);
      } catch (error) {
        // Log the error to the console for debugging
        console.error("Failed to fetch schedule", error);
      } finally {
        // IMPORTANT: Set loading to false in both success and error cases
        setLoading(false);
      }
    };

    // We only want to run this fetch if a user is logged in AND they are a doctor
    if (userInfo && userInfo.role === "Doctor") {
      fetchSchedule();
    }
  }, [userInfo]); // This effect re-runs if the user logs in or out

  // While data is being fetched, display the skeleton loader
  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold mb-4">
          <SkeletonLoader className="h-7 w-52" />
        </h3>
        <div className="overflow-x-auto">
          {/* A skeleton version of the table */}
          <div className="min-w-full bg-white border">
            <div className="bg-gray-200">
              <div className="flex">
                <div className="w-1/4 px-4 py-3 border-r">
                  <SkeletonLoader className="h-5 w-full" />
                </div>
                <div className="w-1/4 px-4 py-3 border-r">
                  <SkeletonLoader className="h-5 w-full" />
                </div>
                <div className="w-1/4 px-4 py-3 border-r">
                  <SkeletonLoader className="h-5 w-full" />
                </div>
                <div className="w-1/4 px-4 py-3">
                  <SkeletonLoader className="h-5 w-full" />
                </div>
              </div>
            </div>
            <div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex border-t">
                  <div className="w-1/4 px-4 py-3 border-r">
                    <SkeletonLoader className="h-5 w-full" />
                  </div>
                  <div className="w-1/4 px-4 py-3 border-r">
                    <SkeletonLoader className="h-5 w-full" />
                  </div>
                  <div className="w-1/4 px-4 py-3 border-r">
                    <SkeletonLoader className="h-5 w-full" />
                  </div>
                  <div className="w-1/4 px-4 py-3">
                    <SkeletonLoader className="h-5 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Once loading is complete, display the actual data or a "no appointments" message
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">My Upcoming Appointments</h3>
      {schedule.length === 0 ? (
        <p className="text-gray-500">You have no appointments scheduled.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                  Patient Name
                </th>
                <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                  Patient Email
                </th>
                <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                  Appointment Date
                </th>
                <th className="px-4 py-2 border text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{apt.patient.name}</td>
                  <td className="px-4 py-2 border">{apt.patient.email}</td>
                  <td className="px-4 py-2 border">
                    {new Date(apt.appointmentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{apt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorSchedule;
