/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";
import api from "../../../../services/axios.service";
import { useParams } from "@tanstack/react-router";

export function UserProductDetail() {
  const { productId } = useParams({}); // Ambil ID dari route
  const [product, setProduct] = useState(null);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/master/product/${productId}`);
      console.log(res.data.data);
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Produk tidak ditemukan.</p>
      </div>
    );
  }

  const hasImages = product.images?.length > 0;
  const hasVideo = product.videos?.length > 0;
  const mediaItems = [
    ...(hasImages ? product.images.map((img) => img.url) : []),
    ...(hasVideo ? ["video"] : []),
  ];

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));

  const formatRupiah = (value) =>
    value ? `Rp ${value.toLocaleString("id-ID")}` : "Harga tidak tersedia";

  const whatsappLink = `https://wa.me/62${
    product.contactNumber || ""
  }?text=${encodeURIComponent(
    `Halo Admin, saya tertarik dengan produk *${product.productName}*. Bisa dibantu informasi lebih lanjut?`
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 md:px-10 flex justify-center">
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-3xl overflow-hidden p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* IMAGE & VIDEO VIEWER */}
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
                    <source src={product.videos[0]} type="video/mp4" />
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
                Kategori: {product.categoryName || "-"}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                {product.productName}
              </h1>

              <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-700 text-sm">Mulai dari:</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatRupiah(product.minprice)}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open(whatsappLink, "_blank")}
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
