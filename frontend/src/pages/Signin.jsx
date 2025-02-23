import React, { useState } from "react";
import "./Signup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("https://emotorad-3.onrender.com/user/login", { username, password });
      console.log("Response:", response);
      setMessage("Login successful");
      navigate("/dashboard", { state: { user: response.data.user } });
    } catch (err) {
      console.error("Error:", err);
      setMessage(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setMessage("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with Google:", user);

        setGoogleLoading(true);
        navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google sign in:", error);
      setMessage("Error during Google sign in");
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
        <div className="triangle"></div>
      </div>

      <div className="right-panel">
        <h2>Sign In</h2>
        <p>Welcome back! Please log in.</p>

        <div className="oauth-buttons">
          <button className="google-btn" onClick={signInWithGoogle} disabled={googleLoading}>
            <i className="fab fa-google"></i> {googleLoading ? "Signing in..." : "Sign In with Google"}
          </button>
          <button className="apple-btn" disabled={loading}>
            <i className="fab fa-apple"></i> Sign In with Apple
          </button>
        </div>

        <hr />

        <div className="form-container">
          <label>Email address</label>
          <input type="email" placeholder="johndoe@gmail.com" onChange={handleUsernameChange} required />

          <label>Password</label>
          <input type="password" placeholder="********" onChange={handlePasswordChange} required />
          <Link to="/forgetpassword">
            <span className="forget-password">Forget Password?</span>
          </Link>


          <button className="sign-in-btn" onClick={handleSignIn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {message && <p className={`message ${message.includes("error") ? "error" : "success"}`}>{message}</p>}
        </div>

        <p className="register-text">
          Don’t have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
