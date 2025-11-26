/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import api from "../../../services/axios.service";

export function ContactSection() {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchById = async () => {
      try {
        const res = await api.get("/master/profile/");
        setProfile(res.data.data);
      } catch (error) {
        console.log("Error fetching company profile:", error);
      }
    };
    fetchById();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = profile.phone?.replace(/^0/, "62") || ""; // Convert 08xxx to 62xxx
    const message = `Halo, saya *${formData.name}*.\n
Email: ${formData.email}\n
No. HP: ${formData.phone}\n
Pesan:\n${formData.message}`;

    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(link, "_blank"); // Buka WA

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center text-[#ff9a3e]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hubungi Kami
      </motion.h2>
      <p className="text-gray-600 text-center max-w-xl mx-auto mt-2 mb-12">
        Ada pertanyaan atau ingin bekerja sama? Silakan hubungi kami kapan saja.
      </p>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* LEFT SIDE - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 rounded-2xl shadow-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Informasi Kontak
          </h3>

          <div className="flex items-start gap-4 mb-5">
            <FaMapMarkerAlt className="text-[#ff9a3e] text-2xl" />
            <p className="text-gray-700">{profile?.address}</p>
          </div>

          <div className="flex items-start gap-4 mb-5">
            <FaPhoneAlt className="text-[#ff9a3e] text-2xl" />
            <p className="text-gray-700">
              {profile?.phone} <br />
              (WhatsApp tersedia)
            </p>
          </div>

          <div className="flex items-start gap-4 mb-5">
            <FaEnvelope className="text-[#ff9a3e] text-2xl" />
            <p className="text-gray-700">{profile?.email}</p>
          </div>
        </motion.div>

        {/* RIGHT SIDE - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 p-8 rounded-2xl shadow-md"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Kirim Pesan</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 text-sm">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9a3e]"
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9a3e]"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm">Nomor HP</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9a3e]"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div className="mt-4">
            <label className="text-gray-700 text-sm">Pesan</label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9a3e]"
              placeholder="Tuliskan pesan Anda..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 bg-[#ff9a3e] text-white font-bold rounded-xl hover:bg-[#ff8310] transition"
          >
            Kirim ke WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  );
}
