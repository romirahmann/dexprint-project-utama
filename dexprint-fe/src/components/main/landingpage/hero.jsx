/* eslint-disable no-unused-vars */
import { useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/axios.service";

export function HeroSection() {
  const router = useRouter();
  const [heros, setHeros] = useState([]);

  const fetchBanner = useCallback(async () => {
    try {
      let res = await api.get("/master/heros");

      setHeros(res.data.data);
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    fetchBanner();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heros.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heros.length]);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* IMAGE SLIDER */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={heros[currentIndex]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heros[currentIndex]?.file})` }}
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
          className="text-xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-[#ff9a3e] to-[#6b6b6b] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Hi... Nice to meet you
        </motion.h1>
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#ff9a3e] to-[#6b6b6b] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          We’re Not Just a Print Shop <br /> We’re Your Creative Partner
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl max-w-2xl mb-8 text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          Kami memahami setiap kebutuhan anda dan memastikan semua sesuai
          harapan
        </motion.p>
        <motion.button
          onClick={() => router.navigate({ to: "products" })}
          className="bg-[#ff9a3e] hover:bg-[#ff7f00] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Jelajahi Produk
        </motion.button>
      </div>
    </section>
  );
}
