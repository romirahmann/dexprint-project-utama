/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaComments, FaPencilRuler, FaPrint } from "react-icons/fa";

export function ServiceSection() {
  const services = [
    {
      icon: <FaComments className="text-brand-orange text-4xl mb-4" />,
      title: "Layanan Konsultasi",
      desc: "Layanan konsultasi produk cetak atau digital visual dengan tim ahli terbaik.",
      img: "https://images.unsplash.com/photo-1522202222206-1d55b87b2a1e?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaPencilRuler className="text-brand-orange text-4xl mb-4" />,
      title: "Desain Kreatif",
      desc: "Kami bantu wujudkan identitas visual brand Anda dengan desain yang menarik dan profesional.",
      img: "",
    },
    {
      icon: <FaPrint className="text-brand-orange text-4xl mb-4" />,
      title: "Printing Berkualitas",
      desc: "Layanan cetak terlengkap untuk kebutuhan branding promosi, acara, personal, operasional.",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaComments className="text-brand-orange text-4xl mb-4" />,
      title: "Layanan Konsultasi",
      desc: "Layanan konsultasi produk cetak atau digital visual dengan tim ahli terbaik.",
      img: "https://images.unsplash.com/photo-1522202222206-1d55b87b2a1e?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaPencilRuler className="text-brand-orange text-4xl mb-4" />,
      title: "Desain Kreatif",
      desc: "Kami bantu wujudkan identitas visual brand Anda dengan desain yang menarik dan profesional.",
      img: "",
    },
    {
      icon: <FaPrint className="text-brand-orange text-4xl mb-4" />,
      title: "Printing Berkualitas",
      desc: "Layanan cetak terlengkap untuk kebutuhan branding promosi, acara, personal, operasional.",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaComments className="text-brand-orange text-4xl mb-4" />,
      title: "Layanan Konsultasi",
      desc: "Layanan konsultasi produk cetak atau digital visual dengan tim ahli terbaik.",
      img: "https://images.unsplash.com/photo-1522202222206-1d55b87b2a1e?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <FaPencilRuler className="text-brand-orange text-4xl mb-4" />,
      title: "Desain Kreatif",
      desc: "Kami bantu wujudkan identitas visual brand Anda dengan desain yang menarik dan profesional.",
      img: "",
    },
    {
      icon: <FaPrint className="text-brand-orange text-4xl mb-4" />,
      title: "Printing Berkualitas",
      desc: "Layanan cetak terlengkap untuk kebutuhan branding promosi, acara, personal, operasional.",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen py-14 lg:py-24 bg-gradient-to-b from-white to-orange-50 text-center"
    >
      <motion.h2
        className="text-4xl lg:text-5xl font-extrabold text-brand-orange mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Layanan Kami
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col items-center">
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
