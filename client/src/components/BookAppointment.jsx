// src/components/BookAppointment.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"; // 1. Import the toast object

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  // We no longer need useState for error and success messages
  // const [error, setError] = useState('');
  // const [success, setSuccess] = useState('');

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(data);
      } catch {
        console.error("Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor || !appointmentDate) {
      // 2. Replace alert with toast.error
      toast.error("Please select a doctor and a date.");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        { doctorId: selectedDoctor, appointmentDate },
        config
      );

      // 3. Replace alert with toast.success
      toast.success("Appointment booked successfully!");

      // Clear the form
      setSelectedDoctor("");
      setAppointmentDate("");
      // You may want to trigger a refresh of the appointments list here
    } catch (err) {
      const message = err.response
        ? err.response.data.message
        : "Failed to book appointment.";
      // 4. Replace alert with toast.error for API errors
      toast.error(message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Book a New Appointment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="">-- Choose a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} ({doctor.specialization})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Book Appointment
        </button>
        {/* 5. We can remove the old error/success message elements */}
      </form>
    </div>
  );
};

export default BookAppointment;
