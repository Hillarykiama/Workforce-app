// src/pages/Dashboard.jsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Example dummy data
const data = [
  { day: "Mon", tasks: 3 },
  { day: "Tue", tasks: 4 },
  { day: "Wed", tasks: 2 },
  { day: "Thu", tasks: 5 },
  { day: "Fri", tasks: 1 },
  { day: "Sat", tasks: 3 },
  { day: "Sun", tasks: 4 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Tasks</h2>
        {/* ✅ fixed height wrapper so chart actually renders */}
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
















