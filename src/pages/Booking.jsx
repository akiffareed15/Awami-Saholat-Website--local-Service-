import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { demoWorkers, serviceCategories, cities } from "../data/workers";
import { useApp } from "../context/AppContext";

export default function Booking() {
  const navigate = useNavigate();
  const { user, userType, addBooking, selectedCity, setSelectedCity } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: "",
    city: selectedCity || "Islamabad",
    area: "",
    workerId: "",
    date: "",
    time: "",
    hours: 2,
    address: "",
    description: "",
    customerName: user?.name || "",
    customerPhone: user?.phone || "",
    customerEmail: user?.email || "",
  });

  const filteredWorkers = demoWorkers.filter((worker) => {
    if (formData.serviceType && worker.serviceId !== parseInt(formData.serviceType)) {
      return false;
    }
    if (formData.city && formData.city !== "All" && worker.city !== formData.city) {
      return false;
    }
    return true;
  });

  const selectedWorker = demoWorkers.find((w) => w.id === parseInt(formData.workerId));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || userType !== "customer") {
      alert("Please login as a customer to book a service");
      navigate("/login");
      return;
    }

    if (!selectedWorker) {
      alert("Please select a worker");
      return;
    }

    const totalPrice = selectedWorker.pricePerHour * formData.hours;
    const booking = addBooking({
      workerId: selectedWorker.id,
      workerName: selectedWorker.name,
      serviceType: selectedWorker.serviceType,
      date: formData.date,
      time: formData.time,
      hours: formData.hours,
      address: formData.address,
      area: formData.area,
      city: formData.city,
      description: formData.description,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      pricePerHour: selectedWorker.pricePerHour,
      totalPrice: totalPrice,
    });

    alert(`Booking confirmed! Total: Rs ${totalPrice.toLocaleString()}`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Service</h1>
          <p className="text-xl text-gray-600">
            Fill in the details below to book your service
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`font-semibold ${
                      step >= s ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {s === 1 ? "Service" : s === 2 ? "Worker" : "Details"}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > s ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Service & Location</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    required
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  >
                    <option value="">Select a service</option>
                    {serviceCategories.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.icon} {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value, area: "" });
                      setSelectedCity(e.target.value);
                    }}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  >
                    <option value="All">All Cities</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="Enter your area"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                </div>

                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    disabled={!formData.serviceType || !formData.city}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next: Choose Worker →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Worker Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Choose a Worker</h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                </div>

                {filteredWorkers.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">No workers available for selected criteria.</p>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Change filters
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredWorkers.map((worker) => (
                      <motion.div
                        key={worker.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setFormData({ ...formData, workerId: worker.id.toString() })}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.workerId === worker.id.toString()
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={worker.image}
                            alt={worker.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-gray-900">{worker.name}</h3>
                              {worker.verified && (
                                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                  ✓
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{worker.serviceType}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-yellow-500">★ {worker.rating}</span>
                              <span className="text-blue-600 font-bold">
                                Rs {worker.pricePerHour.toLocaleString()}/hr
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {worker.area}, {worker.city}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {selectedWorker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 p-4 rounded-lg"
                  >
                    <p className="text-sm text-gray-600 mb-1">Selected Worker</p>
                    <p className="font-bold text-gray-900">{selectedWorker.name}</p>
                    <p className="text-sm text-gray-600">
                      Rs {selectedWorker.pricePerHour.toLocaleString()}/hr
                    </p>
                  </motion.div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ← Back
                  </button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(3)}
                    disabled={!formData.workerId}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Next: Booking Details →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Booking Details */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    ← Back
                  </button>
                </div>

                {selectedWorker && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-600 mb-2">Selected Worker</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedWorker.image}
                        alt={selectedWorker.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{selectedWorker.name}</p>
                        <p className="text-sm text-gray-600">{selectedWorker.serviceType}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time *
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hours *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="8"
                      required
                      value={formData.hours}
                      onChange={(e) =>
                        setFormData({ ...formData, hours: parseInt(e.target.value) })
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, customerPhone: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, customerEmail: e.target.value })
                      }
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows="3"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                    placeholder="Describe the service you need..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {selectedWorker && (
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Service Cost</span>
                      <span className="text-2xl font-bold text-blue-600">
                        Rs {(selectedWorker.pricePerHour * formData.hours).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formData.hours} hours × Rs {selectedWorker.pricePerHour.toLocaleString()}/hr
                    </p>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ← Back
                  </button>
                  {!user || userType !== "customer" ? (
                    <div className="text-center">
                      <p className="text-gray-600 mb-2">Please login to complete booking</p>
                      <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        Login →
                      </Link>
                    </div>
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                      Confirm Booking
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
      </form>
        </motion.div>
      </div>
    </div>
  );
}
