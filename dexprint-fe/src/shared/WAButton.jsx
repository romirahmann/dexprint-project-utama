/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function WAButton() {
  const phone = "+6285881544898";
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang layanan Dexprint!"
  );
  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="fixed bottom-6 right-6 z-[99] flex items-center justify-center 
                 w-14 h-14 rounded-full shadow-lg bg-green-500 text-white 
                 hover:bg-green-600 transition-all duration-300 md:flex hidden"
      aria-label="Chat WhatsApp"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
