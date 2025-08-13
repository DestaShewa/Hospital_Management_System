// src/components/UploadLabReport.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const UploadLabReport = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchPatients = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        // --- THIS IS THE FIXED URL ---
        const { data } = await axios.get(
          "http://localhost:5000/api/users/patients",
          config
        );

        // No need to filter here anymore, the API does it for us!
        setPatients(data);
      } catch (error) {
        toast.error("Could not fetch the patient list.");
        console.error(error);
      }
    };

    if (userInfo) {
      fetchPatients();
    }
  }, [userInfo]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !title || !file) {
      toast.error(
        "Please select a patient, provide a title, and choose a file."
      );
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("patientId", selectedPatient);
    formData.append("title", title);
    formData.append("report", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      await axios.post(
        "http://localhost:5000/api/reports/upload",
        formData,
        config
      );
      toast.success("Lab report uploaded successfully!");
      setSelectedPatient("");
      setTitle("");
      setFile(null);
      e.target.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "File upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Upload Lab Report</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Patient
          </label>
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          >
            <option value="">-- Choose a Patient --</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Report Title
          </label>
          <input
            type="text"
            placeholder="e.g., Blood Test Results - Aug 2025"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload File (PDF, JPG, PNG)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full text-sm text-gray-500 mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isUploading ? "Uploading..." : "Upload Report"}
        </button>
      </form>
    </div>
  );
};

export default UploadLabReport;
