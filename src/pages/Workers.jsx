import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { demoWorkers, serviceCategories, cities } from "../data/workers";
import { useApp } from "../context/AppContext";
import "../css/Workers.css";

export default function Workers() {
  const [searchParams] = useSearchParams();
  const { selectedCity, setSelectedCity } = useApp();
  const [filters, setFilters] = useState({
    city: selectedCity || "All",
    service: searchParams.get("service") || "All",
    minRating: 0,
    maxPrice: 5000,
    search: "",
  });

  const [workers, setWorkers] = useState(demoWorkers);

  useEffect(() => {
    let filtered = [...demoWorkers];

    if (filters.city !== "All") {
      filtered = filtered.filter((w) => w.city === filters.city);
    }

    if (filters.service !== "All") {
      filtered = filtered.filter((w) => w.serviceId === parseInt(filters.service));
    }

    filtered = filtered.filter((w) => w.rating >= filters.minRating);
    filtered = filtered.filter((w) => w.pricePerHour <= filters.maxPrice);

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.name.toLowerCase().includes(searchLower) ||
          w.serviceType.toLowerCase().includes(searchLower) ||
          w.area.toLowerCase().includes(searchLower)
      );
    }

    setWorkers(filtered);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="workers-page">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="workers-header"
        >
          <h1 className="workers-title">Find Professional Workers</h1>
          <p className="workers-subtitle">
            Browse verified professionals ready to help with your service needs
          </p>
        </motion.div>

        <div className="workers-layout">
          {/* Filters Sidebar */}
          <div className="workers-filters-wrapper">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="workers-filters"
            >
              <h2 className="filters-title">Filters</h2>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  placeholder="Name, service, area..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="filter-input"
                />
              </div>

              {/* City Filter */}
              <div className="filter-group">
                <label className="filter-label">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => {
                    handleFilterChange("city", e.target.value);
                    setSelectedCity(e.target.value);
                  }}
                  className="filter-select"
                >
                  <option value="All">All Cities</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Filter */}
              <div className="filter-group">
                <label className="filter-label">Service Type</label>
                <select
                  value={filters.service}
                  onChange={(e) => handleFilterChange("service", e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All Services</option>
                  {serviceCategories.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.icon} {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  Minimum Rating: {filters.minRating.toFixed(1)}★
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange("minRating", parseFloat(e.target.value))}
                  className="filter-range"
                />
              </div>

              {/* Price Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  Max Price: Rs {filters.maxPrice}/hr
                </label>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", parseInt(e.target.value))}
                  className="filter-range"
                />
              </div>

              <button
                onClick={() => {
                  setFilters({
                    city: "All",
                    service: "All",
                    minRating: 0,
                    maxPrice: 5000,
                    search: "",
                  });
                }}
                className="filter-reset"
              >
                Reset Filters
              </button>
            </motion.div>
          </div>

          {/* Workers Grid */}
          <div className="workers-content">
            <div className="workers-count">
              <p>
                Found <span className="workers-count-number">{workers.length}</span> workers
              </p>
            </div>

            {workers.length === 0 ? (
              <div className="workers-empty">
                <p className="workers-empty-text">No workers found matching your criteria.</p>
                <p className="workers-empty-subtext">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="workers-grid">
                {workers.map((worker, index) => (
                  <motion.div
                    key={worker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="worker-card"
                  >
                    <Link to={`/worker/${worker.id}`} className="worker-card-link">
                      <div className="worker-image-wrapper">
                        <img
                          src={worker.image}
                          alt={worker.name}
                          className="worker-image"
                        />
                        {worker.verified && (
                          <div className="worker-verified">
                            <span>✓</span> Verified
                          </div>
                        )}
                        <div className="worker-availability">
                          {worker.availability}
                        </div>
                      </div>
                      <div className="worker-card-content">
                        <div className="worker-header">
                          <div>
                            <h3 className="worker-name">{worker.name}</h3>
                            <p className="worker-service">{worker.serviceType}</p>
                          </div>
                          <div className="worker-rating-wrapper">
                            <div className="worker-rating">
                              <span className="worker-star">★</span>
                              <span className="worker-rating-value">{worker.rating}</span>
                            </div>
                            <p className="worker-reviews">({worker.totalReviews} reviews)</p>
                          </div>
                        </div>
                        <div className="worker-location">
                          <span>📍</span>
                          <span>{worker.area}, {worker.city}</span>
                        </div>
                        <div className="worker-details">
                          <div>
                            <p className="worker-detail-label">Experience</p>
                            <p className="worker-detail-value">{worker.experience}</p>
                          </div>
                          <div className="worker-price-wrapper">
                            <p className="worker-detail-label">Price</p>
                            <p className="worker-price">
                              Rs {worker.pricePerHour.toLocaleString()}/hr
                            </p>
                          </div>
                        </div>
                        <div className="worker-meta">
                          <span>⚡</span>
                          <span>{worker.responseTime}</span>
                          <span className="worker-meta-separator">•</span>
                          <span>{worker.completedJobs} jobs</span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="worker-view-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/worker/${worker.id}`;
                          }}
                        >
                          View Profile
                        </motion.button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
