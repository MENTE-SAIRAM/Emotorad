import React, { useState } from "react";
import "../components/AddProfile.css"; // Ensure styling for modal
import axios from "axios";

const AddNewProfile = ({ onClose }) => {
  const [tab, setTab] = useState("Basic");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhone] = useState("");
  const [name, setName] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeChannel, setYoutubeChannel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateInput = () => {
    if (!name.trim()) return "Profile Name is required.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      return "Please enter a valid email.";
    if (!phonenumber.trim() || !/^\+?[0-9]{10,15}$/.test(phonenumber))
      return "Please enter a valid phone number.";
    return null;
  };

  const handleSubmit = async () => {
    setError("");
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const profilePayload = {
        name,
        email,
        phonenumber,
        instagramLink,
        youtubeChannel,
      };

      const response = await axios.post(
        "https://emotorad-3.onrender.com/profile/addprofile",
        profilePayload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Profile added successfully!");
      console.log("Profile Submission Response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error submitting profile:", error);
      setError("Failed to submit profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Display Validation Error */}
        {error && <p className="error-message">{error}</p>}

        {/* Form Sections */}
        {tab === "Basic" && (
          <div className="form">
            <label>Profile Name*</label>
            <input
              type="text"
              placeholder="Eg. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email*</label>
            <input
              type="email"
              placeholder="Eg. sairam@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Phone Number*</label>
            <input
              type="text"
              placeholder="Eg. +1 123 456 7890"
              value={phonenumber}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}

        {tab === "Social" && (
          <div className="form">
            <label>Instagram Link (Optional)</label>
            <input
              type="text"
              placeholder="Eg. instagram.com/username"
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
            />

            <label>YouTube Link (Optional)</label>
            <input
              type="text"
              placeholder="Eg. youtube.com/username"
              value={youtubeChannel}
              onChange={(e) => setYoutubeChannel(e.target.value)}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Back
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProfile;
