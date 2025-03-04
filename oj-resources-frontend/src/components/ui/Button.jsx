import { motion } from "framer-motion";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
