/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";

export function UserProductDetail() {
  // Dummy Product Data (replace with props or API data)
  const data = {
    productName: "Banner Outdoor Premium",
    description:
      "Banner dengan kualitas cetak tinggi, tahan cuaca, dan cocok untuk kebutuhan promosi luar ruangan. Menggunakan bahan Flexi Korea 280gr dengan warna tajam dan tahan lama.",
    categoryName: "Large Format Printing",
    minprice: 95000,
    images: [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80",
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?q=80",
    ],
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  };

  const { productName, description, categoryName, minprice, images, video } =
    data;

  const [current, setCurrent] = useState(0);
  const hasVideo = Boolean(video);

  const mediaItems = hasVideo ? [...images, "video"] : images;

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 md:px-10 flex justify-center">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-3xl overflow-hidden p-6 md:p-12">
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT - IMAGE & VIDEO VIEWER */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black">
              <AnimatePresence mode="wait">
                {mediaItems[current] === "video" ? (
                  <motion.video
                    key="video"
                    controls
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-cover"
                  >
                    <source src={video} type="video/mp4" />
                  </motion.video>
                ) : (
                  <motion.img
                    key={current}
                    src={mediaItems[current]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                )}
              </AnimatePresence>

              {/* SLIDER BUTTONS */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow"
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="mt-5 flex gap-4 overflow-x-auto pb-2 w-full justify-center">
              {mediaItems.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setCurrent(i)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer 
                  shadow border-2 ${
                    current === i ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  {item === "video" ? (
                    <div className="w-full h-full flex items-center justify-center bg-black/80 text-white">
                      <FaPlayCircle size={36} />
                    </div>
                  ) : (
                    <img
                      src={item}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2">
                Kategori: {categoryName}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {productName}
              </h1>

              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                {description}
              </p>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-700 text-sm">Mulai dari:</p>
                <p className="text-3xl font-bold text-orange-600">
                  Rp {minprice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* CTA BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white
              text-lg py-4 px-6 rounded-xl shadow-lg flex justify-center items-center gap-2"
            >
              <FaWhatsapp /> Konsultasi via WhatsApp
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
