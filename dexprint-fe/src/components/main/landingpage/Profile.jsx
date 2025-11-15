/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../../services/axios.service";

export function ProfileSection() {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const fetchById = async () => {
      try {
        const res = await api.get("/master/profile/1");
        setCompanyInfo(res.data.data);
      } catch (error) {
        console.log("Error fetching company profile:", error);
      }
    };
    fetchById();
  }, []);

  if (!companyInfo) {
    return (
      <section className="py-20 bg-white text-center">
        <p className="text-gray-500 animate-pulse">Memuat data perusahaan...</p>
      </section>
    );
  }

  return (
    <section
      id="company"
      className="py-20 bg-white px-6 md:px-12 max-w-7xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
          alt={companyInfo.companyName}
          className="w-full lg:w-1/2 h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Content */}
        <div className="lg:w-1/2 space-y-5 text-center lg:text-left">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-brand-orange"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tentang {companyInfo.companyName}
          </motion.h2>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {companyInfo.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-2xl font-semibold text-brand-orange">Visi</h3>
              <p className="text-gray-700 whitespace-pre-line text-left">
                {companyInfo.vision}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-brand-orange">Misi</h3>
              <p className="text-gray-700 whitespace-pre-line text-left ">
                {companyInfo.mission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
