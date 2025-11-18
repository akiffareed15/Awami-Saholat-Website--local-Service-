import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { demoWorkers } from "../data/workers";

export default function Dashboard() {
  const { user, userType, bookings, logout } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to view dashboard</h2>
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Login
          </Link>
        </div>
      </div>
    );
  }

  const customerBookings = bookings.filter((b) => b.status !== "cancelled");
  const workerBookings = bookings; // In real app, filter by worker ID

  const stats = {
    customer: {
      total: customerBookings.length,
      pending: customerBookings.filter((b) => b.status === "pending").length,
      completed: customerBookings.filter((b) => b.status === "completed").length,
      totalSpent: customerBookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    },
    worker: {
      total: workerBookings.length,
      pending: workerBookings.filter((b) => b.status === "pending").length,
      completed: workerBookings.filter((b) => b.status === "completed").length,
      earnings: workerBookings
        .filter((b) => b.status === "completed")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                {userType === "customer" ? "Manage your bookings" : "Manage your services"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                {userType === "customer" ? "👤 Customer" : "👷 Worker"}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {userType === "customer" ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-gray-900">{stats.customer.total}</div>
                <div className="text-gray-600 mt-1">Total Bookings</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-yellow-600">{stats.customer.pending}</div>
                <div className="text-gray-600 mt-1">Pending</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-green-600">{stats.customer.completed}</div>
                <div className="text-gray-600 mt-1">Completed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-blue-600">
                  Rs {stats.customer.totalSpent.toLocaleString()}
                </div>
                <div className="text-gray-600 mt-1">Total Spent</div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-gray-900">{stats.worker.total}</div>
                <div className="text-gray-600 mt-1">Total Jobs</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-yellow-600">{stats.worker.pending}</div>
                <div className="text-gray-600 mt-1">Pending</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-green-600">{stats.worker.completed}</div>
                <div className="text-gray-600 mt-1">Completed</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-3xl font-bold text-green-600">
                  Rs {stats.worker.earnings.toLocaleString()}
                </div>
                <div className="text-gray-600 mt-1">Total Earnings</div>
              </motion.div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            {userType === "customer" ? (
              <>
                <Link to="/workers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Find Workers
                  </motion.button>
                </Link>
                <Link to="/booking">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Book a Service
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/workers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    View Profile
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {userType === "customer" ? "My Bookings" : "My Jobs"}
          </h2>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No bookings yet.</p>
              {userType === "customer" ? (
                <Link to="/workers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Book Your First Service
                  </motion.button>
                </Link>
              ) : (
                <p className="text-gray-500">Your job requests will appear here</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => {
                const worker = demoWorkers.find((w) => w.id === booking.workerId);
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          {worker && (
                            <img
                              src={worker.image}
                              alt={worker.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {booking.workerName || "Worker"}
                            </h3>
                            <p className="text-gray-600">{booking.serviceType}</p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                          <div>
                            <p className="text-gray-500">Date & Time</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(booking.date).toLocaleDateString()} at {booking.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Duration</p>
                            <p className="font-semibold text-gray-900">{booking.hours} hours</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Location</p>
                            <p className="font-semibold text-gray-900">
                              {booking.area || booking.city}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Cost</p>
                            <p className="font-semibold text-blue-600 text-lg">
                              Rs {booking.totalPrice?.toLocaleString() || "N/A"}
                            </p>
                          </div>
                        </div>
                        {booking.description && (
                          <div className="mt-4">
                            <p className="text-gray-500 text-sm">Description</p>
                            <p className="text-gray-700">{booking.description}</p>
                          </div>
                        )}
                      </div>
                      <div className="ml-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.status || "pending"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
