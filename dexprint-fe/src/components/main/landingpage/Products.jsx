/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";
import { useRouter } from "@tanstack/react-router";

export function ProductSection() {
  const router = useRouter();
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let res = await api.get("/master/categories");

      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-16 bg-white">
      <motion.h2
        className="text-center text-4xl lg:text-5xl font-extrabold text-brand-orange "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Produk Kami
      </motion.h2>
      <motion.p
        className="text-center text-md lg:text-xl "
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Good Process, Good Product.
      </motion.p>
      <motion.p
        className="text-center text-sm lg:text-md  mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Memastikan setiap proses terbaik menghasilkan produk berkualitas
      </motion.p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 md:px-16 max-w-7xl mx-auto">
        {products.map((product, i) => (
          <motion.button
            onClick={() => router.navigate({ to: "products" })}
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
                {product.categoryName}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.category}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* CTA Button */}
      {/* <motion.div
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
      </motion.div> */}
    </section>
  );
}
