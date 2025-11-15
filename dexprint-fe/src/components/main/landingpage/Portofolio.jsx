/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PortfolioPage() {
  // Dummy UI Data (nanti bisa diganti dari API)
  const portfolioItems = [
    {
      title: "Branding Cafe",
      category: "Branding",
      img: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Poster Event",
      category: "Poster",
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Banner Outdoor",
      category: "Banner",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Packaging Product",
      category: "Packaging",
      img: "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Company Profile",
      category: "Company Profile",
      img: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Design Menu Cafe",
      category: "Menu",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
    },
  ];

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
