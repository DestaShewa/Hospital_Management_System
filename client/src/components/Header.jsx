// src/components/Header.jsx

import React, { useContext } from "react";
// Remove 'useNavigate' from the react-router-dom import
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  // Remove the unused 'navigate' variable
  // const navigate = useNavigate();

  const handleLogout = () => {
    // This function from context handles state, localStorage, AND navigation.
    logout();
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-indigo-200">
          VitalCare HMS
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-200">
            Home
          </Link>

          {/* Conditional links based on login status */}
          {userInfo ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-200">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-indigo-600 hover:bg-gray-200 px-4 py-2 rounded-md font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
