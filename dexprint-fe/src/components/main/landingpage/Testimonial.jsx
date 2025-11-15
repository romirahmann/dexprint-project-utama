/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0); // posisi tengah

  // 🚀 Dummy Data
  useEffect(() => {
    const dummy = [
      {
        name: "Rizky Putra",
        feedback: "Pelayanan cepat dan hasil print sangat memuaskan!",
        tenant: "PT Sinar Jaya",
        fileIMG: "https://i.pravatar.cc/150?img=1",
      },
      {
        name: "Dewi Anggraini",
        feedback: "Harga terjangkau, kualitas juara. Pasti repeat order!",
        tenant: "Dewi Bakery",
        fileIMG: "https://i.pravatar.cc/150?img=2",
      },
      {
        name: "Andi Pratama",
        feedback: "Respons cepat dan sangat membantu kebutuhan desain saya.",
        tenant: "Andi Studio",
        fileIMG: "https://i.pravatar.cc/150?img=3",
      },
      {
        name: "Sarah Lestari",
        feedback: "Hasil print warna tajam dan staffnya ramah.",
        tenant: "Sarah Fashion",
        fileIMG: "https://i.pravatar.cc/150?img=4",
      },
      {
        name: "Handoko",
        feedback: "Rekomendasi banget buat print skala banyak!",
        tenant: "Toko Maju",
        fileIMG: "https://i.pravatar.cc/150?img=5",
      },
    ];

    setTestimonials(dummy);
  }, []);

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // ambil 3 item: left, center, right
  const getVisibleItems = () => {
    if (testimonials.length < 3) return testimonials;

    const left = (index - 1 + testimonials.length) % testimonials.length;
    const center = index;
    const right = (index + 1) % testimonials.length;

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
        className="text-3xl md:text-4xl font-extrabold mb-4 text-[#ff9a3e] "
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
            const isCenter = item.position === "center";

            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isCenter ? 1.1 : 0.9,
                  opacity: isCenter ? 1 : 0.6,
                  filter: isCenter ? "blur(0px)" : "blur(1px)",
                }}
                transition={{ duration: 0.4 }}
                className={`${
                  isCenter ? "z-20" : "z-10"
                } relative bg-white p-8 rounded-2xl shadow-xl w-[260px] md:w-[320px]`}
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
