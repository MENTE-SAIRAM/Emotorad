import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Activites.css";

const activityData = [
  { week: "Week 1", User: 420, Guest: 380 },
  { week: "Week 2", User: 350, Guest: 420 },
  { week: "Week 3", User: 380, Guest: 200 },
  { week: "Week 4", User: 400, Guest: 320 }
];

function Activities() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>Activities</h2>
          <p className="subtitle">May - June 2021</p>
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color user"></div>
            <span>User</span>
          </div>
          <div className="legend-item">
            <div className="legend-color guest"></div>
            <span>Guest</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
           
            <XAxis dataKey="week" />
            <YAxis />
            <Bar dataKey="User" fill="#4ade80" barSize={40} />
            <Bar dataKey="Guest" fill="rgba(255, 75, 77, 0.97)" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Activities;
