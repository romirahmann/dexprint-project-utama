import { useEffect, useState } from "react";
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import api from "../../../services/axios.service";

export default function ContactPage() {
  const [profile, setProfile] = useState({});
  const [banner, setBanner] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Maps embed tetap — tidak diubah
  const embedMaps =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.6730037668685!2d107.2985761749753!3d-6.306621761719566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6977dcce6c888b%3A0xf84fb6ebb80c567c!2sDexPrint!5e0!3m2!1sid!2sid!4v1763353539487!5m2!1sid!2sid";

  useEffect(() => {
    loadProfile();
    loadBanner();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/master/profile/1");
      setProfile(res.data.data);
    } catch (err) {
      console.log("Error loading profile:", err);
    }
  };

  const loadBanner = async () => {
    try {
      const res = await api.get("/banners?page=contact");
      setBanner(res.data.data?.[0] || {});
    } catch (err) {
      console.log("Error loading banner:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = profile.phone?.replace(/^0/, "62") || "";
    const message = `Halo, saya *${formData.name}*.
Email: ${formData.email}
No. HP: ${formData.phone}

Pesan:
${formData.message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="w-full pb-20">
      {/* --- DYNAMIC BANNER --- */}
      <div className="relative w-full h-[500px] md:h-[550px] rounded-2xl overflow-hidden mb-16 shadow-lg">
        <img
          src={banner?.imageUrl || "https://via.placeholder.com/1500x600"}
          className="w-full h-full object-cover"
          alt="Contact Banner"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-6">
          <h1 className="text-xl md:text-3xl font-bold text-white text-center max-w-3xl leading-snug drop-shadow">
            {banner?.title || "Butuh Bantuan atau Penawaran Cepat?"}
            <span className="text-5xl block text-brand-orange font-extrabold">
              {banner?.subtitle || "Tim Kami Siap Melayani Anda."}
            </span>
          </h1>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 px-6 md:px-14">
        {/* CONTACT INFO */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {profile.description ||
              "Konsultasikan kebutuhan Anda, tim kami akan membantu cepat & profesional."}
          </p>

          <div className="space-y-4">
            {/* PHONE */}
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <FaPhone className="text-2xl text-blue-600" />
              <span className="text-gray-700 font-medium text-lg">
                {profile.phone}
              </span>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${profile.phone?.replace(/^0/, "62")}`}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <FaWhatsapp className="text-2xl text-green-600" />
              <span className="text-gray-700 font-medium text-lg">
                WhatsApp Admin
              </span>
            </a>

            {/* EMAIL */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <FaEnvelope className="text-2xl text-red-600" />
              <span className="text-gray-700 font-medium text-lg">
                {profile.email}
              </span>
            </a>

            {/* ADDRESS */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
              <FaMapMarkerAlt className="text-2xl text-gray-600" />
              <span className="text-gray-700 font-medium text-lg">
                {profile.address}
              </span>
            </div>
          </div>
        </div>

        {/* --- CONTACT FORM --- */}
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Kirim Pesan
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nomor WhatsApp"
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-4"
            />

            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Pesan / Kebutuhan Anda"
              className="p-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-4"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition mt-4"
            >
              Kirim ke WhatsApp
            </button>
          </form>
        </div>
      </div>

      {/* --- MAPS (Tetap, Tidak Diubah) --- */}
      <div className="w-full px-6 md:px-14 mt-20">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Lokasi Kami</h3>
        <div className="w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl">
          <iframe
            src={embedMaps}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
