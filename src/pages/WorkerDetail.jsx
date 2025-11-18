import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { demoWorkers, reviews, serviceCategories } from "../data/workers";
import { useApp } from "../context/AppContext";
import "../css/WorkerDetail.css";

export default function WorkerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userType, addBooking } = useApp();
  const worker = demoWorkers.find((w) => w.id === parseInt(id));
  const workerReviews = reviews.filter((r) => r.workerId === worker?.id);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    hours: 2,
    address: "",
    description: "",
  });

  if (!worker) {
    return (
      <div className="worker-detail-not-found">
        <div className="worker-detail-not-found-content">
          <h2>Worker not found</h2>
          <Link to="/workers" className="worker-detail-back-link">
            Back to Workers
          </Link>
        </div>
      </div>
    );
  }

  const serviceCategory = serviceCategories.find((s) => s.id === worker.serviceId);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!user || userType !== "customer") {
      alert("Please login as a customer to book a service");
      navigate("/login");
      return;
    }

    const totalPrice = worker.pricePerHour * bookingData.hours;
    const booking = addBooking({
      workerId: worker.id,
      workerName: worker.name,
      serviceType: worker.serviceType,
      date: bookingData.date,
      time: bookingData.time,
      hours: bookingData.hours,
      address: bookingData.address,
      description: bookingData.description,
      pricePerHour: worker.pricePerHour,
      totalPrice: totalPrice,
    });

    alert(`Booking confirmed! Total: Rs ${totalPrice.toLocaleString()}`);
    setShowBookingForm(false);
    navigate("/dashboard");
  };

  return (
    <div className="worker-detail-page">
      <div className="container">
        {/* Back Button */}
        <Link to="/workers" className="worker-detail-back-btn">
          <span>←</span> Back to Workers
        </Link>

        {/* Main Worker Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="worker-detail-main"
        >
          {/* Left Side - Worker Image */}
          <div className="worker-detail-image-section">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="worker-detail-image-wrapper"
            >
              <img
                src={worker.image}
                alt={worker.name}
                className="worker-detail-image"
              />
              <div className="worker-detail-image-glow"></div>
              {worker.verified && (
                <div className="worker-detail-verified-badge">
                  <span>✓</span> Verified Professional
                </div>
              )}
            </motion.div>
            <div className="worker-detail-service-icon">
              <div className="worker-detail-icon-wrapper">
                {serviceCategory?.icon}
              </div>
              <p className="worker-detail-service-name">{serviceCategory?.name}</p>
            </div>
          </div>

          {/* Right Side - Worker Details */}
          <div className="worker-detail-info-section">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="worker-detail-info-card"
            >
              <div className="worker-detail-header">
                <h1 className="worker-detail-name">{worker.name}</h1>
                <div className="worker-detail-rating-main">
                  <span className="worker-detail-star">★</span>
                  <span className="worker-detail-rating-value">{worker.rating}</span>
                  <span className="worker-detail-reviews-count">({worker.totalReviews} reviews)</span>
                </div>
              </div>
              
              <p className="worker-detail-service-type">{worker.serviceType} Professional</p>
              
              <div className="worker-detail-location">
                <span className="worker-detail-location-icon">📍</span>
                <span>{worker.area}, {worker.city}</span>
              </div>

              <div className="worker-detail-price-section">
                <span className="worker-detail-price-label">Starting from</span>
                <div className="worker-detail-price">
                  Rs {worker.pricePerHour.toLocaleString()}
                  <span className="worker-detail-price-unit">/hour</span>
                </div>
              </div>

              <div className="worker-detail-stats-grid">
                <div className="worker-detail-stat-item">
                  <div className="worker-detail-stat-icon">💼</div>
                  <div>
                    <p className="worker-detail-stat-label">Experience</p>
                    <p className="worker-detail-stat-value">{worker.experience}</p>
                  </div>
                </div>
                <div className="worker-detail-stat-item">
                  <div className="worker-detail-stat-icon">✅</div>
                  <div>
                    <p className="worker-detail-stat-label">Completed Jobs</p>
                    <p className="worker-detail-stat-value">{worker.completedJobs}+</p>
                  </div>
                </div>
                <div className="worker-detail-stat-item">
                  <div className="worker-detail-stat-icon">⚡</div>
                  <div>
                    <p className="worker-detail-stat-label">Response Time</p>
                    <p className="worker-detail-stat-value">{worker.responseTime}</p>
                  </div>
                </div>
                <div className="worker-detail-stat-item">
                  <div className="worker-detail-stat-icon">🗣️</div>
                  <div>
                    <p className="worker-detail-stat-label">Languages</p>
                    <p className="worker-detail-stat-value">{worker.languages.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="worker-detail-availability">
                <span className="worker-detail-availability-badge">{worker.availability}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(37, 99, 235, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="worker-detail-book-btn"
              >
                {showBookingForm ? "Cancel Booking" : "Book Service Now"}
              </motion.button>

              {showBookingForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleBooking}
                  className="worker-detail-booking-form"
                >
                  <h3 className="worker-detail-form-title">Booking Details</h3>
                  <div className="worker-detail-form-grid">
                    <div className="worker-detail-form-group">
                      <label>Date *</label>
                      <input
                        type="date"
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="worker-detail-form-group">
                      <label>Time *</label>
                      <input
                        type="time"
                        required
                        value={bookingData.time}
                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      />
                    </div>
                    <div className="worker-detail-form-group">
                      <label>Hours *</label>
                      <input
                        type="number"
                        min="1"
                        max="8"
                        required
                        value={bookingData.hours}
                        onChange={(e) => setBookingData({ ...bookingData, hours: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="worker-detail-form-group">
                    <label>Address *</label>
                    <textarea
                      required
                      value={bookingData.address}
                      onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                      rows="2"
                    />
                  </div>
                  <div className="worker-detail-form-group">
                    <label>Description *</label>
                    <textarea
                      required
                      value={bookingData.description}
                      onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
                      rows="3"
                    />
                  </div>
                  <div className="worker-detail-total-cost">
                    <p>Total Cost</p>
                    <p className="worker-detail-total-amount">
                      Rs {(worker.pricePerHour * bookingData.hours).toLocaleString()}
                    </p>
                  </div>
                  <button type="submit" className="worker-detail-confirm-btn">
                    Confirm Booking
                  </button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="worker-detail-about"
        >
          <h2 className="worker-detail-section-title">About {worker.name}</h2>
          <p className="worker-detail-description">{worker.description}</p>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="worker-detail-reviews"
        >
          <h2 className="worker-detail-section-title">
            Customer Reviews ({workerReviews.length})
          </h2>
          {workerReviews.length === 0 ? (
            <p className="worker-detail-no-reviews">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="worker-detail-reviews-list">
              {workerReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="worker-detail-review-card"
                >
                  <div className="worker-detail-review-header">
                    <div>
                      <p className="worker-detail-review-customer">{review.customer}</p>
                      <div className="worker-detail-review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="worker-detail-review-date">{review.date}</p>
                  </div>
                  <p className="worker-detail-review-comment">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
