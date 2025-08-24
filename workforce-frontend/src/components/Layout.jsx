// src/components/Layout.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaHome, FaUsers, FaChartBar } from "react-icons/fa"; // Font Awesome icons

export default function Layout({ children }) {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${
      isActive ? "bg-blue-100 font-semibold" : ""
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">Workforce Platform</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={linkClasses}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/home" className={linkClasses}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/employees" className={linkClasses}>
            <FaUsers /> Employees
          </NavLink>
          <NavLink to="/reports" className={linkClasses}>
            <FaChartBar /> Reports
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}



