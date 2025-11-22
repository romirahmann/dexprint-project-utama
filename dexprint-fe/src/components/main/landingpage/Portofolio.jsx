/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
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

  // Dummy data sementara jika API belum mengembalikan data
  const dummyData = [
    {
      title: "Branding Cafe Aroma",
      category: "Branding",
      img: "https://via.placeholder.com/400x300?text=Branding+1",
    },
    {
      title: "Poster Launch Event",
      category: "Poster",
      img: "https://via.placeholder.com/400x300?text=Poster+2",
    },
    {
      title: "Banner Promo",
      category: "Banner",
      img: "https://via.placeholder.com/400x300?text=Banner+3",
    },
    {
      title: "Packaging Product",
      category: "Packaging",
      img: "https://via.placeholder.com/400x300?text=Packaging+4",
    },
    {
      title: "Menu Design Coffee",
      category: "Menu",
      img: "https://via.placeholder.com/400x300?text=Menu+5",
    },
    {
      title: "Company Profile Design",
      category: "Company Profile",
      img: "https://via.placeholder.com/400x300?text=Company+Profile+6",
    },
  ];

  const itemsToShow = portfolioItems.length ? portfolioItems : dummyData;

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
      <PhotoProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {itemsToShow.map((item, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow-md group"
              whileHover={{ y: -5 }}
            >
              {/* Gambar dengan PhotoView */}
              <PhotoView src={item.img}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                />
              </PhotoView>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-orange-300">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
}
