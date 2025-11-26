/* eslint-disable no-unused-vars */
/* Improved ProductPage with automatic zigzag sections + Search */

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

import { DisplayProductLeft } from "../../../components/main/products/DisplayProductLeft";
import { DisplayProductRight } from "../../../components/main/products/DisplayProductRight";
import api from "../../../services/axios.service";
import { useRouter } from "@tanstack/react-router";

export function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const banners = [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80",
    "https://images.unsplash.com/photo-1503602642458-232111445657?q=80",
    "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80",
  ];

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  const fetchProductByCategory = async () => {
    try {
      let res = await api.get("/master/products-by-catergories");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH FUNCTION
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const allProducts = categories.flatMap((cat) => cat.products || []);
    const filtered = allProducts.filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery, categories]);

  // Banner Slider
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="max-w-full relative pb-10">
      {/* BANNER SLIDER */}
      <section className="w-full h-[35em] relative overflow-hidden rounded-b-3xl shadow-lg">
        <div
          className="w-full h-full flex transition-transform duration-700"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Promo Banner ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover brightness-75 flex-shrink-0"
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Ide Kamu Berharga. Kami Siap Membuatnya Terlihat Nyata.
          </h1>
          <p className="mt-3 text-lg opacity-90 drop-shadow-md">
            Produk display, branding visual, dan solusi cetak premium — semuanya
            ada di sini.
          </p>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
        >
          <FaChevronRight />
        </button>
      </section>

      {/* HEADER */}
      <header className="px-25 mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <h2 className="text-2xl font-semibold text-gray-800 leading-snug">
            Hallo Kak 👋{" "}
            <span className="font-light block md:inline">
              Mau cetak apa hari ini?
            </span>
          </h2>

          <div className="relative w-full md:max-w-lg">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk ..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black/40 focus:outline-none transition"
            />
          </div>
        </div>
      </header>

      {/* PRODUCT SECTIONS / SEARCH RESULT */}
      <div className="px-6 lg:px-42">
        {searchQuery && searchResults.length > 0 ? (
          <SearchResult products={searchResults} />
        ) : searchQuery && searchResults.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            Produk tidak ditemukan.
          </p>
        ) : (
          categories.map((data, index) => {
            const isLeft = index % 2 === 0;
            return (
              <section key={index}>
                {isLeft ? (
                  <DisplayProductLeft
                    products={data.products}
                    title={data.categoryName}
                    productSelected={(val) =>
                      router.navigate({
                        to: "$productId/detail",
                        params: { productId: val.productId },
                      })
                    }
                  />
                ) : (
                  <DisplayProductRight
                    products={data.products}
                    title={data.categoryName}
                    productSelected={(val) =>
                      router.navigate({
                        to: "$productId/detail/",
                        params: { productId: val.productId },
                      })
                    }
                  />
                )}
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}

/* Simple Component For Search Result */
function SearchResult({ products }) {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">
        Hasil Pencarian ({products.length})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-3">
            <div className="w-full h-36 rounded-lg overflow-hidden">
              <img
                src={item.images?.[0]?.url}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 font-semibold text-sm">{item.productName}</p>
            <p className="text-xs text-gray-500">{item.minprice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
