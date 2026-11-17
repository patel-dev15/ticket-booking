
import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await axios.post(
        "http://localhost:6592/auth/register",
        formData
      );

      alert(result.data.message);

      setFormData({
        email: "",
        password: ""
      });
              navigate("/login");


    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-card">

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Register to access your dashboard</p>
        </div>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create Account →"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default SignUp;
