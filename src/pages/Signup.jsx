import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../css/Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    serviceType: "",
    city: "",
    area: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...(userType === "worker" && {
        serviceType: formData.serviceType,
        city: formData.city,
        area: formData.area,
      }),
    };
    login(userData, userType);
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="signup-container"
      >
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Join Awami Saholat today</p>
          </div>

          {/* User Type Selection */}
          <div className="signup-user-type">
            <label className="signup-user-type-label">I want to</label>
            <div className="signup-user-type-buttons">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType("customer")}
                className={`user-type-btn ${userType === "customer" ? "user-type-btn-active" : ""}`}
              >
                👤 Book Services
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType("worker")}
                className={`user-type-btn ${userType === "worker" ? "user-type-btn-active" : ""}`}
              >
                👷 Offer Services
              </motion.button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="signup-error"
              >
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
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
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7307 354561"
                className="form-input"
              />
            </div>

            {userType === "worker" && (
              <>
                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <select
                    required
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Select service</option>
                    <option value="Plumbing">🔧 Plumbing</option>
                    <option value="Electrical">⚡ Electrical</option>
                    <option value="Carpentry">🪚 Carpentry</option>
                    <option value="Mechanic">🔩 Mechanic</option>
                    <option value="Cleaning">🧹 Cleaning</option>
                    <option value="Painting">🎨 Painting</option>
                    <option value="AC Repair">❄️ AC Repair</option>
                    <option value="Masonry">🧱 Masonry</option>
                  </select>
                </div>
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <select
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select city</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Area</label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="Area"
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 6 characters"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className="form-input"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary btn-full"
            >
              Create Account
            </motion.button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="signup-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
