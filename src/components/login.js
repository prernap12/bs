import React, { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "./login.css";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // ✅ Login success
      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.token); // if backend sends a JWT
      localStorage.setItem("username", res.data.user.username); // store username
    
      

      onClose(); // close modal after login
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-form-container">
        <div className="auth-close-btn" onClick={onClose}>
          <FaTimes />
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="auth-title">Sign in</h3>

         <span className="auth-label">Email</span>
<input
  type="email"
  className="auth-input"
  placeholder="Enter your email"
  value={email}
  autoCapitalize="none"
  autoCorrect="off"
  spellCheck="false"
  autoComplete="off"
  onChange={(e) => setEmail(e.target.value.toLowerCase())} // ✅ force lowercase
  required
/>

<span className="auth-label">Password</span>
<div className="auth-password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    className="auth-input"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <span
    className="auth-eye-icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>


          <div className="auth-check">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="auth-error">{error}</p>}

          <p className="auth-links">
            Forget password? <a href="#">Click here</a>
          </p>
          <p className="auth-links">
            Don't have an account? <a href="#">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
