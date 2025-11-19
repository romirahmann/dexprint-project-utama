/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

export function PortfolioPage() {
  // Example portofolio data
  const portfolios = [
    {
      title: "Booth Exhibition",
      category: "Display",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&w=600",
    },
    {
      title: "Branding Package",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&w=600",
    },
    {
      title: "Rollup Banner",
      category: "Print",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&w=600",
    },
    {
      title: "Backdrop Event",
      category: "Event",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&w=600",
    },
    {
      title: "Product Showcase",
      category: "Display",
      image:
        "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&w=600",
    },
    {
      title: "Company Profile Print",
      category: "Print",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&w=600",
    },
  ];

  const bannerImage =
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&w=1600";

  return (
    <div className="w-full">
      {/* ======================= */}
      {/* BANNER SECTION */}
      {/* ======================= */}
      <div className="w-full h-[220px] md:h-[300px] lg:h-[420px] overflow-hidden rounded-none md:rounded-2xl shadow">
        <img
          src={bannerImage}
          className="w-full h-full object-cover"
          alt="Portfolio Banner"
        />
      </div>

      {/* ======================= */}
      {/* TITLE */}
      {/* ======================= */}
      <div className="px-4 md:px-8 lg:px-12 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Portofolio Kami
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Semua kategori proyek terbaru telah kami gabungkan untuk menampilkan
          hasil karya terbaik.
        </p>
      </div>

      {/* ======================= */}
      {/* GRID PORTOFOLIO */}
      {/* ======================= */}
      <div className="px-4 md:px-8 lg:px-12 mt-8 mb-14">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
        "
        >
          {portfolios.map((item, index) => (
            <div
              key={index}
              className="
                bg-white rounded-xl shadow-md overflow-hidden 
                hover:shadow-xl hover:-translate-y-1 
                transition-all duration-300 cursor-pointer
              "
            >
              <div className="w-full h-48 md:h-56 lg:h-60 overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={item.title}
                />
              </div>

              <div className="p-4">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                  {item.category}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
