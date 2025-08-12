// src/components/ManageDoctors.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManageDoctors = () => {
  // State for the list of doctors fetched from the backend
  const [doctors, setDoctors] = useState([]);

  // State for the form fields
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experienceInYears, setExperienceInYears] = useState("");

  // State for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user info (for the token) from our global context
  const { userInfo } = useContext(AuthContext);

  // --- Function to fetch all doctors ---
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      // Make a GET request to our public endpoint to get all doctors
      const { data } = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(data);
      setLoading(false);
    } catch {
      setError("Failed to fetch doctors.");
      setLoading(false);
    }
  };

  // --- useEffect to fetch doctors when the component first loads ---
  useEffect(() => {
    fetchDoctors();
  }, []); // The empty array ensures this runs only once on mount

  // --- Function to handle the form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // --- This is how we make a PROTECTED API request ---
    // 1. Create a config object with the Authorization header
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Get the token from our context
      },
    };

    try {
      setLoading(true);
      // 2. Make the POST request with the form data and the config object
      await axios.post(
        "http://localhost:5000/api/doctors",
        { userId, name, specialization, qualifications, experienceInYears },
        config
      );
      setLoading(false);
      alert("Doctor profile created successfully!");

      // Clear the form fields after successful submission
      setUserId("");
      setName("");
      setSpecialization("");
      setQualifications("");
      setExperienceInYears("");

      // Refresh the list of doctors to show the newly added one
      fetchDoctors();
    } catch (err) {
      setLoading(false);
      // Display the specific error message from the backend
      setError(
        err.response
          ? err.response.data.message
          : "Failed to create doctor profile."
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* --- FORM FOR ADDING A NEW DOCTOR --- */}
      <h3 className="text-xl font-semibold mb-4">Add New Doctor Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor's User ID*
          </label>
          <input
            type="text"
            placeholder="Enter the User ID of a registered 'Doctor' user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            *Note: You must first register a user with the 'Doctor' role to get
            their User ID.
          </p>
        </div>
        {/* Other input fields for name, specialization, etc. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Specialization
          </label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Qualifications
          </label>
          <input
            type="text"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience (Years)
          </label>
          <input
            type="number"
            value={experienceInYears}
            onChange={(e) => setExperienceInYears(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Doctor Profile"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* --- TABLE TO DISPLAY EXISTING DOCTORS --- */}
      <h3 className="text-xl font-semibold mb-4">Existing Doctors</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Specialization</th>
              <th className="px-4 py-2 border">Qualifications</th>
              <th className="px-4 py-2 border">Experience</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td className="px-4 py-2 border">{doctor.name}</td>
                  <td className="px-4 py-2 border">{doctor.specialization}</td>
                  <td className="px-4 py-2 border">{doctor.qualifications}</td>
                  <td className="px-4 py-2 border text-center">
                    {doctor.experienceInYears} years
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
