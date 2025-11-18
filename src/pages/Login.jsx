import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.email && formData.password) {
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: formData.email.split("@")[0],
        phone: "+44 7307 354561",
      };
      login(userData, userType);
      navigate("/dashboard");
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="login-container"
      >
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Login to your account</p>
          </div>

          {/* User Type Selection */}
          <div className="login-user-type">
            <label className="login-user-type-label">I am a</label>
            <div className="login-user-type-buttons">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType("customer")}
                className={`user-type-btn ${userType === "customer" ? "user-type-btn-active" : ""}`}
              >
                👤 Customer
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType("worker")}
                className={`user-type-btn ${userType === "worker" ? "user-type-btn-active" : ""}`}
              >
                👷 Worker
              </motion.button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="login-error"
              >
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="form-input"
              />
            </div>

            <div className="form-options">
              <label className="form-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="form-forgot">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary btn-full"
            >
              Login
            </motion.button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="login-link">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="login-demo">
            <p>Demo: Enter any email and password to login</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
