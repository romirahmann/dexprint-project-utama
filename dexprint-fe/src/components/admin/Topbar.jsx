/* eslint-disable no-unused-vars */
import { FiBell, FiMenu, FiSearch, FiLogOut, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { persistor } from "../../store";
import { useRouter } from "@tanstack/react-router";

export function Topbar({ onToggleSidebar }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const route = useRouter();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    setIsUserMenuOpen(false);
    route.navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      {/* Sidebar Toggle (Mobile) */}
      <button
        onClick={onToggleSidebar}
        className="text-gray-600 md:hidden hover:text-orange-500 transition-colors"
      >
        <FiMenu size={22} />
      </button>

      {/* Search */}
      <div className="flex items-center bg-gray-100/80 px-3 py-2 rounded-full focus-within:ring-2 focus-within:ring-orange-500 md:w-[20em] transition-all">
        <FiSearch className="text-gray-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative" ref={userMenuRef}>
        {/* Notification */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative text-gray-600 hover:text-orange-500 transition-all p-2 rounded-full hover:bg-orange-500/10"
        >
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </motion.button>

        {/* User Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-gray-800 px-3 py-1.5 rounded-full transition-all"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold">
            A
          </div>
          <span className="hidden md:inline text-sm font-medium">
            {user?.username || "Guest"}
          </span>
        </motion.button>

        {/* User Popup */}
        <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-14 w-56 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50"
            >
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">
                  {user?.username || "Guest"}
                </p>
                <p className="text-sm text-gray-500">{user?.roleName || ""}</p>
              </div>
              {/* <button className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                <FiUser /> Profile
              </button> */}
              <button
                onClick={() => handleLogout()}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all"
              >
                <FiLogOut /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
