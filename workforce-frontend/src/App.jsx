import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Employees from "./pages/Employees";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <Routes>
      {/* Wrap everything inside Layout */}
      <Route path="/" element={<Layout />}>
        {/* Default (index) page */}
        <Route
          index
          element={
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome to Workforce Platform
              </h1>
              <p className="mt-4 text-gray-600">
                Select an option from the sidebar to get started.
              </p>
            </div>
          }
        />
        <Route path="employees" element={<Employees />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}













