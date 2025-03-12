"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { TiShoppingCart } from "react-icons/ti";
import useCartStore from "../app/Store/cartStore.js";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore((state) => state.items);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-gray-500 shadow-md fixed w-full top-0 z-50 right-6 items-center justify-center">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-green-600 tracking-tighter"
        >
          OJ<span className="italic text-black">Resources</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex bg-gray-500 space-x-6">
          <li>
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Shop" className="hover:text-green-600">
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/Cart"
              className="mb-[0.9] px-3 py-1 flex justify-center items-center rounded-md relative hover:text-green-600"
            >
              <TiShoppingCart size={24} />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link href="/About" className="hover:text-green-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/Contact" className="hover:text-green-600">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:text-green-600">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-green-600">
              Register
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
                href="/Shop"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/Cart"
                className="mb-[0.9] px-3 py-1 flex items-center relative"
                onClick={() => setIsOpen(false)}
              >
                <TiShoppingCart size={24} />
                {cart?.length > 0 && (
                  <span className="absolute -top-2 left-8 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/About"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/Contact"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;
