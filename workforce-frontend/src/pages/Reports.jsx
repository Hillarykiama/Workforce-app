// src/pages/Reports.jsx
import React from "react";
import Layout from "../components/Layout";

export default function Reports() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Monthly Attendance</h2>
          <p className="mt-2 text-gray-600">
            Track employee attendance trends over the month.
          </p>
          <div className="mt-4 h-40 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">[Chart Placeholder]</span>
          </div>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Employee Performance</h2>
          <p className="mt-2 text-gray-600">
            View performance reports and KPIs.
          </p>
          <div className="mt-4 h-40 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400">[Chart Placeholder]</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

