// components/Navbar.jsx
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          AgriShop
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-green-600">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-green-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-green-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-md p-4"
        >
          <ul className="space-y-4">
            <li>
              <Link href="/" className="block" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
