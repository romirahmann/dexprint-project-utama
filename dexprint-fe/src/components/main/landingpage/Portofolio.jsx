/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";

export function PortfolioPage() {
  const [portfolioItems, setPortofolioItems] = useState([]);

  useEffect(() => {
    fetchPortofolio();
  }, []);

  const fetchPortofolio = async () => {
    try {
      let res = await api.get("/master/portofolios");
      setPortofolioItems(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-24 px-6 md:px-16 bg-white min-h-screen">
      {/* Heading */}
      <motion.h2
        className="text-center text-4xl md:text-5xl font-extrabold text-[#ff9a3e] mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Portofolio Kami
      </motion.h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Beberapa hasil pekerjaan terbaik kami dalam bidang percetakan, branding,
        dan desain grafis. Tampilkan kualitas visual brand Anda bersama tim
        terbaik kami.
      </p>

      {/* FILTER UI */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          "Semua",
          "Branding",
          "Poster",
          "Banner",
          "Packaging",
          "Menu",
          "Company Profile",
        ].map((filter, index) => (
          <button
            key={index}
            className="px-5 py-2 rounded-full border border-[#ff9a3e] text-[#ff9a3e] hover:bg-[#ff9a3e] hover:text-white transition-all"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {portfolioItems.map((item, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-md group"
            whileHover={{ y: -5 }}
          >
            {/* Gambar */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-orange-300">{item.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
