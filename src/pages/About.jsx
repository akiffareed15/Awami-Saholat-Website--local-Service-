import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../css/About.css";

export default function About() {
  const features = [
    {
      icon: "✓",
      title: "Verified Workers",
      description: "All workers are verified and background checked for your safety.",
    },
    {
      icon: "⭐",
      title: "Quality Service",
      description: "Rated and reviewed by thousands of satisfied customers.",
    },
    {
      icon: "💰",
      title: "Fair Pricing",
      description: "Transparent pricing with no hidden charges.",
    },
    {
      icon: "⚡",
      title: "Quick Response",
      description: "Get service at your doorstep within hours.",
    },
    {
      icon: "🛡️",
      title: "Secure Payment",
      description: "Safe and secure payment options.",
    },
    {
      icon: "📱",
      title: "Easy Booking",
      description: "Book services in just a few clicks.",
    },
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-content"
          >
            <h1 className="about-hero-title">About Awami Saholat</h1>
            <p className="about-hero-description">
              Your trusted platform connecting customers with professional service providers
              across Pakistan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-mission-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-mission-content"
            >
              <h2 className="about-mission-title">Our Mission</h2>
              <p className="about-mission-text">
                Awami Saholat is dedicated to making home services accessible, reliable, and
                convenient for everyone in Pakistan. We believe that finding the right
                professional for your needs should be simple and stress-free.
              </p>
              <p className="about-mission-text">
                Our platform connects customers with verified, skilled professionals across
                various service categories, ensuring quality work and customer satisfaction.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="about-image-wrapper"
            >
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                  alt="Team"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-features-header"
          >
            <h2 className="about-features-title">Why Choose Us</h2>
            <p className="about-features-subtitle">
              We provide the best platform for home services in Pakistan
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats-grid">
            {[
              { number: "500+", label: "Verified Workers" },
              { number: "10K+", label: "Happy Customers" },
              { number: "50K+", label: "Jobs Completed" },
              { number: "4.8★", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="about-stat-card"
              >
                <div className="about-stat-number">{stat.number}</div>
                <div className="about-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-cta-content"
          >
            <h2 className="about-cta-title">
              Join the Awami Saholat Community
            </h2>
            <p className="about-cta-subtitle">
              Whether you need a service or want to offer one, we're here to help.
            </p>
            <div className="about-cta-buttons">
              <Link to="/workers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="about-cta-btn-primary"
                >
                  Find a Worker
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="about-cta-btn-secondary"
                >
                  Become a Worker
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
