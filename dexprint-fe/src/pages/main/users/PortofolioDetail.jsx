/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
} from "react-icons/fa";

export function PortofolioDetailPage() {
  // Dummy Data
  const data = {
    name: "Branding Project – Dexprint",
    description:
      "Project branding untuk klien dengan fokus pada identitas visual, warna, dan pola desain yang konsisten. Hasil akhir menampilkan estetika modern serta kompatibel untuk media digital maupun cetak.",
    date: "12 Januari 2025",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80",
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80",
    ],
  };

  const { name, description, date, images } = data;
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 py-20 px-6">
        {/* CARD WRAPPER */}
        <div className="w-full max-w-full bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-10 md:p-14">
          {/* ORIGINAL CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* LEFT IMAGE PANEL */}
            <div className="relative lg:col-span-1 px-4 md:px-8 flex flex-col">
              {/* Main Cover Image */}
              <div className="relative w-full h-[360px] md:h-[520px] rounded-2xl overflow-hidden shadow-xl bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current}
                    src={images[current]}
                    alt="preview"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* NAVIGATION */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md
                       hover:bg-white shadow-lg p-3 rounded-full transition"
                >
                  <FaChevronLeft className="text-gray-700" size={18} />
                </button>

                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md
                       hover:bg-white shadow-lg p-3 rounded-full transition"
                >
                  <FaChevronRight className="text-gray-700" size={18} />
                </button>
              </div>

              {/* THUMBNAILS BELOW IMAGE */}
              <div className="flex gap-4 mt-6 overflow-x-auto pb-3 px-2">
                {images.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    onClick={() => setCurrent(i)}
                    whileHover={{ scale: 1.08 }}
                    className={`w-24 h-24 object-cover rounded-xl cursor-pointer shadow 
                    transition border
                    ${
                      current === i ? "border-blue-500" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT DETAILS PANEL */}
            <div className=" lg:col-span-2 p-6 flex flex-col ">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {name}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                {description}
              </p>

              <div className="mt-6 text-gray-500 text-sm">
                <span className="font-medium text-gray-700">
                  Tanggal Project:
                </span>{" "}
                {date}
              </div>

              {/* CTA BUTTON */}
              <div className="mt-auto">
                <motion.button
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700
               hover:from-blue-600 hover:to-blue-800 text-white font-semibold 
               text-lg shadow-lg hover:shadow-blue-300/40 transition flex items-center 
               justify-center gap-3"
                >
                  <FaWhatsapp size={22} />
                  Hubungi Untuk Project Serupa
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        {/* END CARD */}
      </div>
    </>
  );
}
