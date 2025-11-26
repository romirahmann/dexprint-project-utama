/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../../../services/axios.service";
import { useRouter } from "@tanstack/react-router";

export function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    product: "",
  });

  useEffect(() => {
    fetchPortfolios();
    fetchCategories();
    fetchProducts();
  }, []);

  // Ambil portofolio
  const fetchPortfolios = async () => {
    try {
      let res = await api.get("/master/portofolios");
      console.log(res.data.data);
      setPortfolios(res.data.data);
      setFilteredPortfolios(res.data.data);
    } catch (error) {
      console.log("Error fetching portofolios:", error);
    }
  };

  // Ambil categories untuk filter
  const fetchCategories = async () => {
    try {
      let res = await api.get("/master/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // Ambil Products untuk filter
  const fetchProducts = async () => {
    try {
      let res = await api.get("/master/products");
      setProducts(res.data.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  // Apply filtering logic
  const applyFilters = (activeFilters) => {
    let data = portfolios;

    if (activeFilters.search) {
      data = data.filter((item) =>
        item.productName
          .toLowerCase()
          .includes(activeFilters.search.toLowerCase())
      );
    }

    if (activeFilters.category) {
      data = data.filter(
        (item) => item.categoryName === activeFilters.category
      );
    }

    if (activeFilters.product) {
      data = data.filter((item) => item.productName === activeFilters.product);
    }

    setFilteredPortfolios(data);
  };

  const bannerImage =
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&w=1600";

  return (
    <div className="w-full">
      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[220px] md:h-[320px] lg:h-[420px] overflow-hidden shadow-lg">
        <img
          src={bannerImage}
          alt="Portfolio Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 md:px-10 backdrop-blur-sm">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Portofolio Kami
          </h1>
          <p className="text-sm md:text-lg text-gray-200 mt-2 max-w-3xl">
            Temukan hasil terbaik dari project dan pesanan pelanggan kami.
          </p>
        </div>
      </div>

      {/* ===== FILTER SECTION ===== */}
      <div className="px-4 md:px-8 lg:px-12 mt-10 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Cari berdasarkan nama produk..."
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Filter by Category */}
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          {/* Filter by Product */}
          <select
            name="product"
            value={filters.product}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Semua Produk</option>
            {products.map((prod) => (
              <option key={prod.productId} value={prod.productName}>
                {prod.productName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== PORTFOLIO GRID ===== */}
      <div className="px-4 md:px-8 lg:px-12 mt-6 mb-16">
        {filteredPortfolios.length === 0 ? (
          <p className="text-center text-gray-400">Data tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPortfolios.map((item, index) => (
              <button
                onClick={() =>
                  router.navigate({
                    to: "detail/$portofolioId",
                    params: { portofolioId: item.portofolioId },
                  })
                }
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="w-full h-48 md:h-56 lg:h-60 overflow-hidden">
                  <img
                    src={
                      item?.images?.[0]?.url ||
                      "https://via.placeholder.com/300?text=No+Image"
                    }
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                    {item.categoryName}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-1">
                    {item.productName}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
