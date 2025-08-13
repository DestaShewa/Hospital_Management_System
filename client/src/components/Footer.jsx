// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">VitalCare HMS</h3>
          <p className="text-gray-400 mt-1">
            Your trusted partner in healthcare management.
          </p>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-indigo-400">
            Facebook
          </a>
          <a href="#" className="hover:text-indigo-400">
            Twitter
          </a>
          <a href="#" className="hover:text-indigo-400">
            LinkedIn
          </a>
          <a href="#" className="hover:text-indigo-400">
            Instagram
          </a>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} VitalCare HMS. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
