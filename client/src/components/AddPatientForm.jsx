// src/components/AddPatientForm.jsx

import React, { useState } from "react";
import axios from "axios";

function AddPatientForm({ onPatientAdded }) {
  // 1. State for form fields
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male", // Default value
    contactNumber: "",
  });

  // 2. A single handler for all input changes
  const handleChange = (e) => {
    // Update the corresponding field in formData
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser refresh on submit
    try {
      // Send the form data to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/patients",
        formData
      );

      // Call the function passed down from the App component
      onPatientAdded(response.data);

      // Clear the form fields after successful submission
      setFormData({ name: "", age: "", gender: "Male", contactNumber: "" });
    } catch (error) {
      console.error("Error adding patient:", error);
      // Here you could add state to show an error message to the user
    }
  };

  // 4. JSX for the form
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add a New Patient
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 font-semibold mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-semibold mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="contactNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatientForm;
