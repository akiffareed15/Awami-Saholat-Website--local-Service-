import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-brand-500 text-white px-6 py-2 rounded-full shadow"
    >
      {children}
    </motion.button>
  );
}
