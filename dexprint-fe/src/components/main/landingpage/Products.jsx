/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export function ProductSection() {
  const products = [
    {
      name: "Kartu Nama",
      desc: "Cetak kartu nama premium dengan berbagai pilihan bahan.",
      img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Banner & Spanduk",
      desc: "Material kuat, kualitas warna tajam, tahan cuaca.",
      img: "https://images.unsplash.com/photo-1585135181957-d43b1dbba8f0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Poster & Brosur",
      desc: "Cocok untuk promosi bisnis, event, dan kebutuhan publikasi.",
      img: "https://images.unsplash.com/photo-1522202222206-1d55b87b2a1e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Kartu Nama",
      desc: "Cetak kartu nama premium dengan berbagai pilihan bahan.",
      img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Banner & Spanduk",
      desc: "Material kuat, kualitas warna tajam, tahan cuaca.",
      img: "https://images.unsplash.com/photo-1585135181957-d43b1dbba8f0?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Poster & Brosur",
      desc: "Cocok untuk promosi bisnis, event, dan kebutuhan publikasi.",
      img: "https://images.unsplash.com/photo-1522202222206-1d55b87b2a1e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <motion.h2
        className="text-center text-4xl lg:text-5xl font-extrabold text-brand-orange mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Produk Kami
      </motion.h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16 max-w-full mx-auto">
        {products.map((product, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <img
              src={product.img}
              className="w-full h-52 object-cover"
              alt={product.name}
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        className="text-center mt-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => (window.location.href = "/products")}
          className="px-8 py-3 rounded-full bg-brand-orange text-white font-semibold shadow-md hover:bg-orange-500 transition-all duration-300 hover:shadow-lg"
        >
          Lihat Produk Lebih Banyak
        </button>
      </motion.div>
    </section>
  );
}
