
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const result = await axios.post(
        "http://localhost:6592/auth/login",
        {
          email,
          password
        }
      );

      alert(result.data.message);

      // Save Token
      localStorage.setItem("token", result.data.token);

      // Login successful - Go to Home
      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message || "Login Failed"
      );

    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Login to continue with ServiceBook</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="login-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-btn">
            Login Now →
          </button>

        </form>

        <div className="login-footer">
          Don't have an account?
          <Link to="/signup"> Create Account</Link>
        </div>

      </div>

    </div>
  );
};

export default Login;
