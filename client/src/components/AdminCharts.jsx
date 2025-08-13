// src/components/AdminCharts.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminCharts = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/stats/summary",
          config
        );
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo && userInfo.role === "Admin") {
      fetchStats();
    }
  }, [userInfo]);

  if (loading || !stats) {
    // You can use your SkeletonLoader here as well for a better UX
    return <div>Loading stats...</div>;
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="mb-8">
      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-600">
            Total Patients
          </h4>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalPatients}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-600">Total Doctors</h4>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalDoctors}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-600">
            Total Appointments
          </h4>
          <p className="text-4xl font-bold text-indigo-600">
            {stats.totalAppointments}
          </p>
        </div>
      </div>

      {/* Pie Chart for User Role Distribution */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          User Role Distribution
        </h4>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={stats.userRoleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {stats.userRoleDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
