// src/pages/RegisterPage.jsx

import React, { useState } from "react";
import axios from "axios"; // Make sure to import axios

const RegisterPage = () => {
  // State for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient"); // Default role is set to 'Patient'

  // This function is called when the user clicks the "Register" button
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior which causes a page refresh
    e.preventDefault();

    // Basic validation to ensure fields are not empty
    if (!name || !email || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Send a POST request to our backend's registration endpoint
      const { data } = await axios.post(
        // The URL of our backend API for registration
        "http://localhost:5000/api/users/register",
        // The data payload we are sending, which is the current state of our form
        { name, email, password, role }
      );

      // If the request is successful, the backend sends back the user object and a token.
      console.log("Registration successful!", data);
      alert("Registration Successful! You can now log in.");

      // Optionally, you can redirect the user to the login page upon successful registration
      // To do this, you would need to use the `useNavigate` hook from `react-router-dom`
      // For now, an alert is sufficient.
    } catch (error) {
      // If the backend returns an error (e.g., user already exists), it will be caught here.
      // 'error.response.data.message' will contain the specific error message from our Express backend.
      console.error(
        "Registration failed:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        `Registration Failed: ${
          error.response
            ? error.response.data.message
            : "An unexpected error occurred."
        }`
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>

        {/* The onSubmit event on the form element triggers our handleSubmit function */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Selection Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              I am a:
            </label>
            <select
              id="role"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              {/* Note: In a real application, Admin registration might be a restricted action. */}
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
