import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'customer' or 'worker'
  const [bookings, setBookings] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [selectedService, setSelectedService] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedUserType = localStorage.getItem("userType");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    }
  }, [user, userType]);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setBookings([]);
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  const updateBooking = (bookingId, updates) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, ...updates } : booking
      )
    );
  };

  const value = {
    user,
    userType,
    login,
    logout,
    bookings,
    addBooking,
    updateBooking,
    selectedCity,
    setSelectedCity,
    selectedService,
    setSelectedService,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


