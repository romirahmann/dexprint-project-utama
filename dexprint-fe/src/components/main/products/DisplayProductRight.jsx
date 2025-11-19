/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export function DisplayProductRight() {
  const promoImage =
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&w=700";

  const products = [
    {
      name: "Event Desk",
      price: 800000,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&w=500",
    },
    {
      name: "Y Banner",
      price: 80000,
      image:
        "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&w=500",
      badge: "BEST SELLER",
    },
    {
      name: "PopUp Counter",
      price: 1600000,
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&w=500",
    },
    {
      name: "Poly Counter",
      price: 1500000,
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&w=500",
    },
    {
      name: "Slim Light Box",
      price: 1620000,
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&w=500",
      badge: "NEW PRODUCT",
    },
    {
      name: "Stand Banner Lipat",
      price: 100000,
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&w=500",
      badge: "NEW PRODUCT",
    },
  ];

  const scrollRef = useRef(null);

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });

  return (
    <div className="w-full p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT PRODUCT CONTENT */}
        <div className="col-span-1 lg:col-span-3 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
            Display Promosi
          </h2>

          {/* Scroll Buttons — desktop only */}
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

          {/* FLEX HORIZONTAL SCROLL */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide px-1 md:px-4"
          >
            <div className="flex gap-4 md:gap-6 pb-3">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white rounded-xl shadow p-3 md:p-4 relative
                    flex-shrink-0
                    w-[80%]
                    sm:w-[55%]
                    md:w-[33%]
                    lg:w-[25%]
                  "
                >
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs py-1 px-3 rounded-full">
                      {item.badge}
                    </div>
                  )}

                  {/* Image */}
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-base font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  {/* Price */}
                  <p className="text-blue-600 font-bold mt-1">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — RESPONSIVE BANNER (seperti versi left) */}
        <div
          className="
            bg-white rounded-2xl overflow-hidden shadow-md
            h-[200px] md:h-[260px] lg:h-full
          "
        >
          <img src={promoImage} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
