import React, { useState } from "react";
import "./Signup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Forgetpassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handlechangepassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      console.log(email
        ,password
        ,securityQuestion);
      const res= await axios.post("https://emotorad-3.onrender.com/user/changepassword", {
        email,
        password,
        securityQuestion,
      });

      setMessage(res.data.message);
      setLoading(false);
      console.log(res)
      if (res) {
        navigate("/signin");
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.error);
    }
  }

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
        <h2>Change Password</h2>

        <hr />

        <div className="form-container">
          <label>Security Question</label>
          <input type="text" placeholder="Your first school name?" onChange={(e) => setSecurityQuestion(e.target.value)} required />
          <label>Email</label>
          <input type="email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} required />

          <label>New Password</label>
          <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} required />


          <button className="sign-in-btn" onClick={handlechangepassword} disabled={loading}>
            {loading ? "Please Wait.." : "Change Password"}
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};  
                                                        
export default Forgetpassword;
