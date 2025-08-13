// src/pages/HomePage.jsx

import React from "react";
import { Link } from "react-router-dom";
// 1. Import some icons from the library
import { FaUserInjured, FaUserMd, FaUserShield } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex-grow">
      {/* Hero Section (remains the same) */}
      <section
        className="relative bg-cover bg-center text-white py-32 px-6"
        style={{ backgroundImage: `url('/images/hero-image.jpg')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Comprehensive Hospital Management
          </h1>
          <p className="text-xl mb-8">
            Streamlining patient care, from booking appointments to managing
            records, all in one place.
          </p>
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* --- REVISED AND IMPROVED FEATURES SECTION --- */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Designed for Everyone
          </h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
            Our system is tailored to meet the unique needs of every user,
            ensuring a seamless and efficient healthcare experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Patient Card */}
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="text-indigo-500 mb-4">
                <FaUserInjured size={60} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">For Patients</h3>
              <p className="text-gray-500">
                Easily book appointments, view your medical history, and manage
                your health records online with our secure and intuitive portal.
              </p>
            </div>

            {/* Doctor Card */}
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="text-indigo-500 mb-4">
                <FaUserMd size={60} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">For Doctors</h3>
              <p className="text-gray-500">
                Access patient schedules, update medical records in real-time,
                and manage your daily appointments with our efficient dashboard.
              </p>
            </div>

            {/* Admin Card */}
            <div className="p-8 bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="text-indigo-500 mb-4">
                <FaUserShield size={60} className="mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">For Admins</h3>
              <p className="text-gray-500">
                Oversee all hospital operations, manage staff and doctor
                profiles, and view comprehensive data analytics from one central
                hub.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
