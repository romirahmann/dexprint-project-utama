/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  // MENU CONFIG
  const menuItems = [
    { label: "Home", type: "page", target: "/" },
    { label: "Layanan", type: "scroll", target: "layanan" },
    { label: "Produk", type: "page", target: "/products" },
    { label: "Portofolio", type: "page", target: "/portofolio" },
    { label: "FAQ", type: "scroll", target: "faq" },
    { label: "Kontak", type: "page", target: "/contact" },
  ];

  const renderMenuItem = (item) => {
    if (item.type === "scroll") {
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => handleScrollTo(item.target)}
          className="hover:text-[#ff7f00] transition-colors cursor-pointer"
        >
          {item.label}
        </motion.button>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
        <Link
          to={item.target}
          onClick={() => setOpen(false)}
          className="hover:text-[#ff7f00] transition-colors cursor-pointer"
        >
          {item.label}
        </Link>
      </motion.div>
    );
  };

  return (
    <nav className="fixed top-0 left-0  z-50 w-full bg-white/90 backdrop-blur-md shadow-md transition-all duration-300 select-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* BRAND LOGO */}
        <img
          src="/images/brand.png"
          alt="Brand Logo"
          className="w-40 select-none"
        />

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-8 font-medium text-[#ff9a3e]">
          {menuItems.map((item) => (
            <li key={item.label}>{renderMenuItem(item)}</li>
          ))}
        </ul>

        {/* CTA BUTTON */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="hidden md:block px-5 py-2 rounded-full font-semibold 
                     bg-[#ff9a3e] text-white hover:bg-[#ff7f00] 
                     transition-all duration-200 shadow-md cursor-pointer"
        >
          Order Now
        </motion.button>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-[#ff9a3e] cursor-pointer"
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-sm"
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium text-[#ff9a3e]">
              {menuItems.map((item) => (
                <li key={item.label}>{renderMenuItem(item)}</li>
              ))}

              {/* CTA MOBILE */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setOpen(false)}
                className="bg-[#ff9a3e] text-white px-5 py-2 rounded-full font-semibold 
                           hover:bg-[#ff7f00] transition-colors duration-200"
              >
                Order Now
              </motion.button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
