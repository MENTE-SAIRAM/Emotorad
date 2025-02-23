import React, { useState } from "react";
import "./Signup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    setMessage("");
    try {
      console.log(email, password, securityQuestion);
      const response = await axios.post("https://emotorad-3.onrender.com/user/register", { email, password, securityQuestion });
      console.log("Response:", response);
      setMessage("Registration successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>BASE</h1>
        <div className="icons">
          <i className="fab fa-github"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-discord"></i>
        </div>
      </div>
      <div className="right-panel">
        <h2>Sign Up</h2>
        <p>Create an account</p>

        <hr />

        <div className="form-container">
          <label>Email</label>
          <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} required />

          <label>Security Question : Your first school name?</label>
          <input type="text" placeholder="Your first school?" onChange={(e) => setSecurityQuestion(e.target.value)} required />

          <button className="sign-in-btn" onClick={handleSignUp} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {message && <p className="message">{message}</p>}
        </div>

        <p className="register-text">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
