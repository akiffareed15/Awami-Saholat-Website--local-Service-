import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="footer-column"
          >
            <h3 className="footer-logo">
              Awami Saholat
            </h3>
            <p className="footer-description">
              Connecting you with trusted professionals for all your home service needs across
              Pakistan.
            </p>
            <div className="footer-social">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="footer-social-link"
                >
                  <span>{social[0].toUpperCase()}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="footer-column"
          >
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/workers", label: "Workers" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="footer-column"
          >
            <h4 className="footer-title">Services</h4>
            <ul className="footer-list">
              {[
                "Plumbing",
                "Electrical",
                "Carpentry",
                "Mechanic",
                "Cleaning",
                "Painting",
                "AC Repair",
                "Masonry",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="footer-link"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="footer-column"
          >
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <span>📧</span>
                <span>akiffareed152@gmail.com</span>
              </li>
              <li className="footer-contact-item">
                <span>📞</span>
                <span>+44 7307 354561</span>
              </li>
              <li className="footer-contact-item footer-contact-item-address">
                <span>📍</span>
                <span>
                  Islamabad, Rawalpindi<br />
                  All across Pakistan
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="footer-copyright">
          <p>&copy; {currentYear} Awami Saholat. All rights reserved.</p>
          <p className="footer-copyright-text">
            Made with ❤️ for Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
