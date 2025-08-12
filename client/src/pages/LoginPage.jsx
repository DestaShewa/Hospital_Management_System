// src/pages/LoginPage.jsx

import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import our global AuthContext

const LoginPage = () => {
  // State for the email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the global 'login' function from our AuthContext
  const { login } = useContext(AuthContext);

  // This function is called when the user clicks the "Login" button
  const handleSubmit = async (e) => {
    // Prevent the default form submission which causes a page refresh
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Send a POST request to our backend's login endpoint
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        // The payload containing the email and password
        { email, password }
      );

      // --- THE KEY CHANGE ---
      // On a successful API call, we no longer just log to the console.
      // We call the global 'login' function from our context and pass the user data.
      // This function will handle setting the state, saving to localStorage, and redirecting.
      login(data);
    } catch (error) {
      // If the backend returns an error (e.g., "Invalid email or password"), it's caught here.
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      alert(
        `Login Failed: ${
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
          Login to Your Account
        </h2>

        {/* The form's onSubmit event triggers our handleSubmit function */}
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>

        {/* Link to the registration page */}
        <div className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
