/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import api from "../../../services/axios.service";

export function Footer() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      let res = await api.get("/master/profile");
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-22">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <motion.h3
            className="text-2xl font-extrabold text-[#ff9a3e] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dexprint
          </motion.h3>
          <p className="text-sm leading-relaxed">{profile.description}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#company" className="hover:text-[#ff9a3e] transition">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#ff9a3e] transition">
                Layanan
              </a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-[#ff9a3e] transition">
                Portofolio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#ff9a3e] transition">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Hubungi Kami
          </h4>
          <ul className="space-y-2 text-sm">
            <li>📍 {profile.address} </li>
            <li>📞 {profile.phone} </li>
            <li>✉️ {profile.email} </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Ikuti Kami</h4>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/dexprint.id/"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-[#ff9a3e] text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@dexprint.id"
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-[#ff9a3e] text-white transition"
            >
              <FaTiktok />
            </a>
            <a
              href={`https://wa.me/${profile.phone}`}
              target="_blank"
              className="p-2 rounded-full bg-gray-800 hover:bg-[#ff9a3e] text-white transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PrintEase. All rights reserved.
        <span className="text-[#ff9a3e]"> Awalan Creative</span>
      </div>
    </footer>
  );
}
