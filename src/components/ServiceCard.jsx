import React from "react";
import "../css/ServiceCard.css";

export default function ServiceCard({ title, description }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="book-btn">Book Now</button>
    </div>
  );
}
