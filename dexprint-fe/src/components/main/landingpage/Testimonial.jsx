/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import api from "../../../services/axios.service";

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0); // posisi tengah

  const fetchTestimoni = useCallback(async () => {
    try {
      const res = await api.get("/master/reviews");
      setTestimonials(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTestimoni();
  }, [fetchTestimoni]);

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // ambil item yang akan ditampilkan
  const getVisibleItems = () => {
    const length = testimonials.length;
    if (length === 0) return [];

    if (length === 1) {
      return [{ ...testimonials[0], position: "center" }];
    }

    if (length === 2) {
      // gunakan index untuk menentukan posisi
      const first = index % 2;
      const second = (index + 1) % 2;
      return [
        { ...testimonials[first], position: "center" },
        { ...testimonials[second], position: "side" },
      ];
    }

    // default untuk 3 atau lebih
    const left = (index - 1 + length) % length;
    const center = index;
    const right = (index + 1) % length;

    return [
      { ...testimonials[left], position: "left" },
      { ...testimonials[center], position: "center" },
      { ...testimonials[right], position: "right" },
    ];
  };

  const visible = getVisibleItems();

  return (
    <section className="py-20 bg-gray-50 text-center overflow-hidden relative">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold mb-4 text-[#ff9a3e]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Apa Kata Pelanggan Kami
      </motion.h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Kami berkomitmen memberikan kualitas terbaik untuk pelanggan kami.
      </p>

      {/* Carousel */}
      <div className="flex justify-center items-center gap-6 px-6 md:px-16 relative">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100"
        >
          ◀
        </button>

        {/* Cards */}
        <div className="flex gap-6 justify-center">
          {visible.map((item, idx) => {
            let scale = 1;
            let opacity = 1;
            let blur = "0px";
            let zIndex = "z-20";

            if (item.position === "center") {
              scale = 1.1;
              opacity = 1;
              blur = "0px";
              zIndex = "z-20";
            } else {
              scale = 0.9;
              opacity = 0.6;
              blur = "1px";
              zIndex = "z-10";
            }

            return (
              <motion.div
                key={idx}
                animate={{ scale, opacity, filter: `blur(${blur})` }}
                transition={{ duration: 0.4 }}
                className={`${zIndex} relative bg-white p-8 rounded-2xl shadow-xl w-[260px] md:w-[320px]`}
              >
                <FaQuoteLeft className="text-[#ff9a3e] text-3xl absolute opacity-30 top-4 left-4" />

                <img
                  src={item.fileIMG}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-[#ff9a3e]/40"
                />

                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  “{item.feedback}”
                </p>

                <h4 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h4>
                <span className="text-sm text-gray-500">{item.tenant}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100"
        >
          ▶
        </button>
      </div>
    </section>
  );
}
