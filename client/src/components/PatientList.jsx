// src/components/PatientList.jsx

import React from "react";

// The component now receives the 'patients' array as an argument (a prop)
function PatientList({ patients }) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Current Patients
      </h2>
      {/* If there are no patients, display a message */}
      {patients.length === 0 ? (
        <p className="text-center text-gray-500">
          No patients have been added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-indigo-600">
                {patient.name}
              </h3>
              <p className="text-gray-700 mt-2">
                <strong>Age:</strong> {patient.age}
              </p>
              <p className="text-gray-700">
                <strong>Gender:</strong> {patient.gender}
              </p>
              <p className="text-gray-700">
                <strong>Contact:</strong> {patient.contactNumber}
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Registered on:{" "}
                {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientList;
