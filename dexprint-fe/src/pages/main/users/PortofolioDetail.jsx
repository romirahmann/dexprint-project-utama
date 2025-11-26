/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";
import { useParams } from "@tanstack/react-router";
import api from "../../../services/axios.service";

export function PortofolioDetailPage() {
  const { portofolioId } = useParams({});
  const [portfolio, setPortfolio] = useState(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, [portofolioId]);

  const fetchPortfolio = async () => {
    try {
      const res = await api.get(`/master/portofolio/${portofolioId}`);
      // console.log(res.data.data);
      setPortfolio(res.data.data);
    } catch (error) {
      console.error("Error fetching portfolio detail:", error);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // DATA KOSONG
  if (!portfolio) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Portofolio tidak ditemukan.</p>
      </div>
    );
  }

  // Extract data
  const {
    productName,
    portoDesc,
    categoryName,

    client,
    doDate,
    images,
    videos,
  } = portfolio;

  const hasImages = images?.length > 0;
  const hasVideo = videos?.length > 0;

  const mediaItems = [
    ...(hasImages ? images.map((img) => img.url) : []),
    ...(hasVideo ? ["video"] : []),
  ];

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));

  const whatsappLink = `https://wa.me/62${""}?text=${encodeURIComponent(
    `Halo Admin, saya tertarik dengan portofolio *${productName}*. Bisa dibantu informasi lebih lanjut?`
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 md:px-10 flex justify-center">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-3xl overflow-hidden p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT MEDIA VIEWER */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black">
              <AnimatePresence mode="wait">
                {mediaItems[current] === "video" ? (
                  <motion.video
                    key="video"
                    controls
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <source src={videos[0]} type="video/mp4" />
                  </motion.video>
                ) : (
                  <motion.img
                    key={current}
                    src={mediaItems[current]}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </AnimatePresence>

              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow"
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
                  className={`relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer shadow border-2 ${
                    current === i ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  {item === "video" ? (
                    <div className="w-full h-full flex items-center justify-center bg-black/80 text-white">
                      <FaPlayCircle size={36} />
                    </div>
                  ) : (
                    <img src={item} className="w-full h-full object-cover" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sm text-orange-600 font-medium">
                Kategori: {categoryName || "-"}
              </span>

              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                {productName}
              </h1>

              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                {portoDesc}
              </p>

              {/* <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-700 text-sm">Mulai dari:</p>
                <p className="text-3xl font-bold text-orange-600">
                  Rp {minPrice?.toLocaleString("id-ID")}
                </p>
              </div> */}

              <table className="mt-5 w-full border text-sm rounded-xl overflow-hidden">
                <tbody>
                  <tr className="border-b">
                    <td className="bg-gray-100 px-4 py-3 font-medium w-1/3">
                      Client
                    </td>
                    <td className="px-4 py-3">{client || "-"}</td>
                  </tr>
                  <tr>
                    <td className="bg-gray-100 px-4 py-3 font-medium">
                      Tanggal
                    </td>
                    <td className="px-4 py-3">{doDate || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CTA BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(whatsappLink, "_blank")}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white text-lg 
              py-4 px-6 rounded-xl shadow-lg flex justify-center items-center gap-2"
            >
              <FaWhatsapp /> Konsultasi via WhatsApp
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
