/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "../../../services/axios.service";

export function DisplayProductLeft({ products = [], title }) {
  const promoImage =
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&w=700";

  const scrollRef = useRef(null);

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });

  return (
    <div className="w-full p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* MOBILE ONLY BANNER */}
        <div className="block lg:hidden rounded-xl overflow-hidden shadow-md">
          <img src={promoImage} className="w-full h-48 object-cover" />
        </div>

        {/* LEFT BANNER — DESKTOP ONLY */}
        <div className="hidden lg:block bg-white rounded-2xl overflow-hidden shadow-md h-full">
          <img src={promoImage} className="w-full h-full object-cover" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-1 lg:col-span-3 relative px-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
            {title}
          </h2>

          {/* DESKTOP ARROWS */}
          <button
            onClick={scrollLeft}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-3 rounded-full hover:bg-gray-200"
          >
            <FaChevronRight />
          </button>

          {/* DESKTOP SCROLL & MOBILE GRID */}
          <div
            ref={scrollRef}
            className="px-1 md:px-4 
              overflow-x-auto scrollbar-hide 
              lg:overflow-x-auto 
              grid grid-cols-2 gap-4 md:gap-6 lg:flex lg:gap-4"
          >
            {products.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white rounded-xl shadow p-3 md:p-4 relative
                  flex-shrink-0
                  w-full
                  sm:w-full
                  md:w-[48%]
                  lg:w-[25%]
                "
              >
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs py-1 px-3 rounded-full">
                    {item.badge}
                  </div>
                )}

                <div className="w-full h-40 rounded-lg overflow-hidden mb-3">
                  <img
                    src={item.images[0].url}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-base font-semibold text-gray-800">
                  {item.productName}
                </h3>
                <p className="font-bold mt-1">
                  Minimal Harga:{" "}
                  <span className="text-blue-500">{item.minprice}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
