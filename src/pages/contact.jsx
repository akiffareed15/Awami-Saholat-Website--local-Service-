import React, { useState } from "react";
import { motion } from "framer-motion";
import "../css/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="contact">
      <div className="container contact-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="contact-header"
        >
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions or need help? We're here to assist you. Reach out to us through any
            of the channels below.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-info-section"
          >
            <div className="contact-info-header">
              <h2 className="contact-info-title">Contact Information</h2>
              <p className="contact-info-description">
                We'd love to hear from you. Send us a message and we'll respond as soon as
                possible.
              </p>
            </div>

            <div className="contact-info-items">
              <motion.div
                whileHover={{ x: 5 }}
                className="contact-info-item"
              >
                <div className="contact-info-icon contact-info-icon-email">
                  <span>📧</span>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-item-title">Email</h3>
                  <p className="contact-info-item-text">akiffareed152@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="contact-info-item"
              >
                <div className="contact-info-icon contact-info-icon-phone">
                  <span>📞</span>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-item-title">Phone</h3>
                  <p className="contact-info-item-text">+44 7307 354561</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="contact-info-item"
              >
                <div className="contact-info-icon contact-info-icon-address">
                  <span>📍</span>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-item-title">Address</h3>
                  <p className="contact-info-item-text">
                    Islamabad, Pakistan<br />
                    Rawalpindi, Pakistan<br />
                    Serving all across Pakistan
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="contact-info-item"
              >
                <div className="contact-info-icon contact-info-icon-hours">
                  <span>🕒</span>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-item-title">Business Hours</h3>
                  <p className="contact-info-item-text">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="contact-info-item-text">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="contact-info-item-text">Sunday: Closed</p>
                </div>
              </motion.div>
            </div>

            <div className="contact-social">
              <h3 className="contact-social-title">Follow Us</h3>
              <div className="contact-social-links">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.2, y: -2 }}
                    className="contact-social-link"
                  >
                    <span>{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="contact-form-wrapper"
          >
            <h2 className="contact-form-title">Send us a Message</h2>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="contact-success"
              >
                <div className="contact-success-icon">✓</div>
                <p className="contact-success-title">Message sent successfully!</p>
                <p className="contact-success-text">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="contact-form-input"
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-form-label">
                    Message *
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="6"
                    className="contact-form-textarea"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="contact-form-submit"
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
