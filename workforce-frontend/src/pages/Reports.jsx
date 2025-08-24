// src/pages/Reports.jsx
export default function Reports() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Reports</h1>
      <p className="text-gray-600">
        Generate and view workforce reports such as attendance, performance, and payroll.
      </p>

      {/* Example report section */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Monthly Attendance Report</h2>
        <p className="text-gray-600 mb-4">View the summary of attendance for all employees this month.</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Download Report
        </button>
      </div>
    </div>
  );
}


