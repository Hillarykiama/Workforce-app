import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 min-h-screen p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-blue-600">Dashboard</Link>
            </li>
            <li>
              <Link to="/employees" className="text-blue-600">Employees</Link>
            </li>
            <li>
              <Link to="/reports" className="text-blue-600">Reports</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}





