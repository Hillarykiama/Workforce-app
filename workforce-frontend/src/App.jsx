// src/App.jsx
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to Workforce Platform
      </h1>
      <p className="text-gray-600 mb-6">
        Select an option from the sidebar to get started.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Employees</h2>
          <p className="mt-2 text-2xl font-bold text-blue-600">42</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Active Employees</h2>
          <p className="mt-2 text-2xl font-bold text-green-600">35</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Inactive Employees</h2>
          <p className="mt-2 text-2xl font-bold text-red-600">7</p>
        </div>
      </div>
    </Layout>
  );
}







