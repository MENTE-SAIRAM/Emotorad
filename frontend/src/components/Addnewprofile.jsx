import React, { useState, useEffect } from "react";
import "../components/AddProfile.css"; // Ensure styling for modal

const AddNewProfile = ({ onClose }) => {
  const [tab, setTab] = useState("Basic");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Profile</h2>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${tab === "Basic" ? "active-tab" : ""}`}
            onClick={() => setTab("Basic")}
          >
            Basic
          </button>
          <button
            className={`tab ${tab === "Social" ? "active-tab" : ""}`}
            onClick={() => setTab("Social")}
          >
            Social
          </button>
        </div>

        {/* Form Sections */}
        {tab === "Basic" && (
          <div className="form">
            <label>Profile Name*</label>
            <input type="text" placeholder="Eg. John Doe" />

            <label>Email*</label>
            <input type="email" required placeholder="sairam@gmail.com" />

            <label>Phone Number*</label>
            <input type="text" placeholder="Eg. +1 123 456 7890" />
          </div>
        )}

        {tab === "Social" && (
          <div className="form">
            <label>Instagram Link (Optional)</label>
            <input type="text" placeholder="Eg. instagram.com/username" />

            <label>YouTube Link (Optional)</label>
            <input type="text" placeholder="Eg. youtube.com/username" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Back
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProfile;
