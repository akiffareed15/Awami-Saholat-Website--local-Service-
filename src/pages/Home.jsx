import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { serviceCategories } from "../data/workers";
import { useApp } from "../context/AppContext";
import "../css/Home.css";

export default function Home() {
  const { setSelectedService } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-text-wrapper" variants={itemVariants}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-badge-wrapper"
              >
                <span className="hero-badge">
                  🇵🇰 Trusted in Pakistan
                </span>
              </motion.div>
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Professional Home Services
                <span className="hero-title-accent">At Your Doorstep</span>
              </motion.h1>
              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Connect with verified professionals for plumbing, electrical, carpentry, mechanics, and more. 
                Available in Islamabad, Rawalpindi, and across Pakistan.
              </motion.p>
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/workers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Find Workers
                  </motion.button>
                </Link>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary"
                  >
                    Browse Services
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-image-wrapper"
              variants={itemVariants}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="hero-image-container"
              >
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
                  alt="Home Services"
                  className="hero-image"
                />
                <motion.div
                  className="hero-stats-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="hero-stats-content">
                    <div className="hero-stats-icon">
                      <span>✓</span>
                    </div>
                    <div>
                      <p className="hero-stats-title">500+ Workers</p>
                      <p className="hero-stats-subtitle">Verified Professionals</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Our Services</h2>
            <p className="section-description">
              Professional services for every need in your home or business
            </p>
          </motion.div>

          <div className="services-grid">
            {serviceCategories.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="service-card"
                onClick={() => {
                  setSelectedService(service.id);
                  window.location.href = `/workers?service=${service.id}`;
                }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <Link
                  to={`/workers?service=${service.id}`}
                  className="service-link"
                >
                  Find Workers <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
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
                className="stat-item"
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="cta-content"
          >
            <h2 className="cta-title">
              Ready to Get Started?
            </h2>
            <p className="cta-description">
              Join thousands of satisfied customers who trust Awami Saholat for their home service needs.
            </p>
            <div className="cta-buttons">
              <Link to="/workers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Book a Service
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline"
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
