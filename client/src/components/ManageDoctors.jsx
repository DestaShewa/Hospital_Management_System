// src/components/ManageDoctors.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"; // We should already have this from the last step
import SkeletonLoader from "./SkeletonLoader"; // 1. Import the SkeletonLoader

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [formState, setFormState] = useState({
    userId: "",
    name: "",
    specialization: "",
    qualifications: "",
    experienceInYears: "",
  });

  // We will use two separate loading states: one for the table and one for the form submission
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userInfo } = useContext(AuthContext);

  // --- Function to fetch all doctors ---
  const fetchDoctors = async () => {
    setIsTableLoading(true); // Start loading before the API call
    try {
      const { data } = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(data);
    } catch {
      toast.error("Failed to fetch doctors.");
    } finally {
      setIsTableLoading(false); // Stop loading in both success and error cases
    }
  };

  // --- useEffect to fetch doctors when the component first loads ---
  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // --- Function to handle the form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios.post("http://localhost:5000/api/doctors", formState, config);
      toast.success("Doctor profile created successfully!");
      setFormState({
        userId: "",
        name: "",
        specialization: "",
        qualifications: "",
        experienceInYears: "",
      });
      fetchDoctors(); // Refresh the list of doctors
    } catch (err) {
      toast.error(
        err.response
          ? err.response.data.message
          : "Failed to create doctor profile."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* --- FORM FOR ADDING A NEW DOCTOR (This part doesn't need a skeleton) --- */}
      <h3 className="text-xl font-semibold mb-4">Add New Doctor Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* ... form fields ... */}
        {/* I've updated the form to use the 'formState' object for cleaner state management */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor's User ID*
          </label>
          <input
            type="text"
            name="userId"
            value={formState.userId}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            *Note: You must first register a user with the 'Doctor' role to get
            their User ID.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
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
            name="specialization"
            value={formState.specialization}
            onChange={handleInputChange}
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
            name="qualifications"
            value={formState.qualifications}
            onChange={handleInputChange}
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
            name="experienceInYears"
            value={formState.experienceInYears}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isSubmitting ? "Creating..." : "Create Doctor Profile"}
        </button>
      </form>

      {/* --- TABLE SECTION --- */}
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
            {/* 2. Here is the conditional rendering logic */}
            {isTableLoading ? (
              // If loading, render skeleton rows
              [1, 2, 3].map((n) => (
                <tr key={n}>
                  <td className="px-4 py-2 border">
                    <SkeletonLoader className="h-5 w-full" />
                  </td>
                  <td className="px-4 py-2 border">
                    <SkeletonLoader className="h-5 w-full" />
                  </td>
                  <td className="px-4 py-2 border">
                    <SkeletonLoader className="h-5 w-full" />
                  </td>
                  <td className="px-4 py-2 border">
                    <SkeletonLoader className="h-5 w-full" />
                  </td>
                </tr>
              ))
            ) : doctors.length > 0 ? (
              // If not loading and doctors exist, render the actual data
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
              // If not loading and there are no doctors
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
