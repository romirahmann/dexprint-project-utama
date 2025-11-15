/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const images = [
    "https://images.unsplash.com/photo-1522205408450-add114ad53fe",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* IMAGE SLIDER */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={images[currentIndex]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#ff9a3e] to-[#6b6b6b] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Solusi Cetak Cepat & Modern
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl max-w-2xl mb-8 text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          PrintEase membantu UMKM dan kreator Gen Z mencetak ide hebat jadi
          nyata.
        </motion.p>
        <motion.button
          className="bg-[#ff9a3e] hover:bg-[#ff7f00] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Jelajahi Layanan
        </motion.button>
      </div>
    </section>
  );
}
