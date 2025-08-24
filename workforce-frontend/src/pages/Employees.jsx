// src/pages/Employees.jsx
import React, { useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Alice Johnson", role: "Manager", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Worker", status: "Inactive" },
    { id: 3, name: "Carol Lee", role: "Supervisor", status: "Active" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.role) return;

    if (editId !== null) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editId ? { id: editId, ...newEmployee } : emp
        )
      );
      setEditId(null);
    } else {
      const nextId =
        employees.length > 0 ? employees[employees.length - 1].id + 1 : 1;
      setEmployees([...employees, { id: nextId, ...newEmployee }]);
    }

    setNewEmployee({ name: "", role: "", status: "Active" });
  };

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setNewEmployee({ name: emp.name, role: emp.role, status: emp.status });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>

      {/* Add/Edit Employee Form */}
      <form onSubmit={handleAdd} className="mb-6 flex gap-2 flex-wrap items-end">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newEmployee.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-48"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newEmployee.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-48"
        />
        <select
          name="status"
          value={newEmployee.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId !== null ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* Employees Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp.id}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="border px-4 py-2">{emp.id}</td>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.role}</td>
              <td className="border px-4 py-2">{emp.status}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}










