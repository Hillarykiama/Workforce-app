// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#f4f4f4" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
      <Link to="/home" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/employees" style={{ marginRight: "10px" }}>Employees</Link>
      <Link to="/reports">Reports</Link>
    </nav>
  );
}
