/* eslint-disable no-unused-vars */
import { FiMenu, FiHome, FiUsers, FiChevronDown } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrTextWrap } from "react-icons/gr";
import { useRouter } from "@tanstack/react-router";

export const Sidebar = memo(function AdminSidebar({
  isOpen,
  setIsOpen,
  isMobile,
}) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const route = useRouter();
  const toggleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const menu = [
    { name: "Dashboard", icon: <FiHome size={18} />, url: "/admin" },
    {
      name: "Profile",
      icon: <FaCircleUser size={18} />,
      url: "/admin/profile",
    },
    {
      name: "Products",
      icon: <AiFillProduct size={18} />,
      url: "/admin/products",
      submenu: [
        { name: "All Products", url: "/admin/products" },
        { name: "Materials", url: "/admin/products/materials" },
        { name: "Categories", url: "/admin/products/categories" },
      ],
    },
    { name: "Konten", icon: <GrTextWrap size={18} />, url: "/admin/content" },
    { name: "Users", icon: <FiUsers size={18} />, url: "/admin/users" },
  ];

  const sidebarWidth = isMobile ? 240 : isOpen ? 200 : 72;

  return (
    <>
      {/* Overlay mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar utama */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile && !isOpen ? "-100%" : 0,
          width: sidebarWidth,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`flex flex-col bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
          border-r border-gray-200 backdrop-blur-xl 
          ${isMobile ? "fixed top-0 left-0 z-50 h-full" : "h-full"}`}
      >
        {/* Header */}
        <div
          className={`flex ${
            isOpen ? "justify-between" : "justify-center"
          } items-center px-4 py-5`}
        >
          <AnimatePresence mode="wait">
            {(isOpen || isMobile) && (
              <motion.h1
                key="logo"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="font-extrabold text-xl text-gray-800 tracking-tight"
              >
                <img src="/images/brand.png" className="w-25" alt="" />
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-orange-500 transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Garis pembatas */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-2" />

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col px-2 py-3 space-y-1">
          {menu.map((item, i) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isExpanded = openSubmenu === item.name;

            return (
              <div key={i}>
                {/* Menu utama */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    hasSubmenu
                      ? toggleSubmenu(item.name)
                      : route.navigate({ to: item.url })
                  }
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-gray-700 
                    hover:bg-orange-500/10 hover:text-orange-600 transition-all duration-200
                    ${!isOpen && !isMobile ? "justify-center" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <AnimatePresence>
                      {(isOpen || isMobile) && (
                        <motion.span
                          key={item.name}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {hasSubmenu && (isOpen || isMobile) && (
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500"
                    >
                      <FiChevronDown size={14} />
                    </motion.span>
                  )}
                </motion.button>

                {/* Submenu */}
                <AnimatePresence>
                  {hasSubmenu && isExpanded && (
                    <motion.div
                      key={`${item.name}-submenu`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-10 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((sub, j) => (
                        <motion.button
                          key={j}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => route.navigate({ to: sub.url })} // <-- ini yang benar
                          className="block text-left w-full text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-all"
                        >
                          {sub.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <AnimatePresence>
          {(isOpen || isMobile) && (
            <motion.div
              key="footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3 border-t border-gray-100 mt-auto text-xs text-gray-500 text-center select-none"
            >
              © 2025 Dexprint
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
});
