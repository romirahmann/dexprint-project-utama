/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import api from "../services/axios.service";

export function WAButton() {
  const [visible, setVisible] = useState(true);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      let res = await api.get("/master/profile");
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const phone = profile.phone;
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang layanan Dexprint!"
  );
  const link = `https://wa.me/+62${phone}?text=${message}`;

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999] md:block hidden">
      {/* Close Button */}
      <motion.button
        onClick={() => setVisible(false)}
        whileHover={{ scale: 1.15 }}
        className="absolute -top-2 -right-2 bg-white text-gray-500 border border-gray-300 
                   w-5 h-5 rounded-full flex items-center justify-center shadow-md"
      >
        <FaTimes size={10} />
      </motion.button>

      {/* Container for hover reveal */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ x: 0 }}
        whileHover={{ x: -20 }} // geser ke kiri saat hover
      >
        {/* Hover Text */}
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow-md"
          >
            Chat Admin
          </motion.span>
        </AnimatePresence>

        {/* Main WA button */}
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center 
                     w-14 h-14 rounded-full shadow-lg bg-green-500 text-white 
                     hover:bg-green-600 transition-all duration-300"
        >
          <FaWhatsapp size={28} />
        </motion.a>
      </motion.div>
    </div>
  );
}
