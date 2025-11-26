/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import api from "../../../services/axios.service";
import { useRouter } from "@tanstack/react-router";

export function PortfolioPage() {
  const [portfolioItems, setPortofolioItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9); // Maksimal tampil awal
  const router = useRouter();

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

  // Data yang ditampilkan hanya 9 pertama
  const displayedItems = portfolioItems.slice(0, visibleCount);

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

      {/* Portfolio Grid */}
      <PhotoProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedItems.map((item, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow-md group"
              whileHover={{ y: -5 }}
            >
              <PhotoView src={item?.images?.[0]?.url}>
                <img
                  src={item?.images?.[0]?.url}
                  alt={item?.images?.[0]?.note}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                />
              </PhotoView>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg font-semibold">{item.portoName}</h3>
                <p className="text-md text-orange-300">{item.productName}</p>
                <p className="text-xs text-orange-300">{item.categoryName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>

      {/* Tombol Lihat Lebih Banyak */}
      {portfolioItems.length > visibleCount && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => router.navigate({ to: "/portofolio" })}
            className="px-6 py-3 bg-[#ff9a3e] hover:bg-[#e87f20] text-white rounded-lg shadow-md transition-all duration-300"
          >
            Lihat Lebih Banyak →
          </button>
        </div>
      )}
    </section>
  );
}
