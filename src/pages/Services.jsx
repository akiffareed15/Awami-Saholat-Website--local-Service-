import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { serviceCategories, demoWorkers } from "../data/workers";
import { useApp } from "../context/AppContext";
import "../css/Services.css";

export default function Services() {
  const { setSelectedService } = useApp();

  const getServiceStats = (serviceId) => {
    const workers = demoWorkers.filter((w) => w.serviceId === serviceId);
    const avgRating =
      workers.length > 0
        ? (workers.reduce((sum, w) => sum + w.rating, 0) / workers.length).toFixed(1)
        : 0;
    const avgPrice =
      workers.length > 0
        ? Math.round(workers.reduce((sum, w) => sum + w.pricePerHour, 0) / workers.length)
        : 0;
    return { count: workers.length, avgRating, avgPrice };
  };

  return (
    <div className="services-page">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="services-header"
        >
          <h1 className="services-title">Our Service Categories</h1>
          <p className="services-description">
            Professional services for every need. Browse our categories and find the perfect
            professional for your job.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid-main">
          {serviceCategories.map((service, index) => {
            const stats = getServiceStats(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="service-category-card"
                onClick={() => {
                  setSelectedService(service.id);
                  window.location.href = `/workers?service=${service.id}`;
                }}
              >
                <motion.div
                  className="service-category-icon"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="service-category-title">{service.name}</h3>
                <p className="service-category-desc">{service.description}</p>
                <div className="service-category-stats">
                  <div className="service-stat">
                    <span className="service-stat-label">Workers</span>
                    <span className="service-stat-value">{stats.count}</span>
                  </div>
                  {stats.count > 0 && (
                    <>
                      <div className="service-stat">
                        <span className="service-stat-label">Avg Rating</span>
                        <span className="service-stat-rating">
                          {stats.avgRating} ★
                        </span>
                      </div>
                      <div className="service-stat">
                        <span className="service-stat-label">Avg Price</span>
                        <span className="service-stat-price">
                          Rs {stats.avgPrice.toLocaleString()}/hr
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <Link
                  to={`/workers?service=${service.id}`}
                  className="service-category-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service.id);
                  }}
                >
                  Find Workers <span>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="how-it-works"
        >
          <h2 className="how-it-works-title">How It Works</h2>
          <div className="how-it-works-grid">
            {[
              {
                step: "1",
                title: "Choose a Service",
                description: "Browse our service categories and select the type of service you need.",
                icon: "🔍",
              },
              {
                step: "2",
                title: "Find a Worker",
                description: "View profiles, ratings, and prices of verified professionals in your area.",
                icon: "👷",
              },
              {
                step: "3",
                title: "Book & Get Service",
                description: "Book your preferred worker and get professional service at your doorstep.",
                icon: "✅",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="how-it-works-item"
              >
                <div className="how-it-works-icon">{step.icon}</div>
                <div className="how-it-works-number">{step.step}</div>
                <h3 className="how-it-works-item-title">{step.title}</h3>
                <p className="how-it-works-item-desc">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="services-cta"
        >
          <h2 className="services-cta-title">Ready to Get Started?</h2>
          <p className="services-cta-desc">
            Join thousands of satisfied customers across Pakistan
          </p>
          <div className="services-cta-buttons">
            <Link to="/workers">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Browse Workers
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline-white"
              >
                Become a Worker
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
