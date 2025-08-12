// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // 3. Check localStorage when the app loads
  useEffect(() => {
    // Try to get user info from localStorage
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      // If found, parse it from JSON and set it to our state
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []); // The empty array [] means this effect runs only once when the component mounts

  // 4. Login function
  const login = (userData) => {
    // Set the user info in the state
    setUserInfo(userData);
    // Store the user info in localStorage as a JSON string
    localStorage.setItem("userInfo", JSON.stringify(userData));
    // Redirect to the dashboard after login
    navigate("/dashboard");
  };

  // 5. Logout function
  const logout = () => {
    // Remove user info from state
    setUserInfo(null);
    // Remove user info from localStorage
    localStorage.removeItem("userInfo");
    // Redirect to the login page after logout
    navigate("/login");
  };

  // 6. The value provided to consuming components
  const value = {
    userInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
