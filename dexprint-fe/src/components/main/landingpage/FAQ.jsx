/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "Apa saja layanan yang ditawarkan?",
    answer:
      "Kami menyediakan layanan pembuatan produk digital seperti website, aplikasi, UI/UX design, serta pembuatan portofolio visual untuk bisnis Anda.",
  },
  {
    id: 2,
    question: "Apakah saya dapat melihat contoh hasil kerja?",
    answer:
      "Tentu! Anda bisa melihatnya pada section Portofolio untuk melihat project yang telah kami selesaikan.",
  },
  {
    id: 3,
    question: "Berapa lama proses pengerjaan project?",
    answer:
      "Durasi tergantung tingkat kesulitan. Website sederhana 1–2 minggu, website custom 3–6 minggu, aplikasi 1–3 bulan.",
  },
  {
    id: 4,
    question: "Apakah setelah project selesai ada support?",
    answer:
      "Ya, kami menyediakan garansi revisi minor, bug-fix, serta opsi maintenance bulanan.",
  },
  {
    id: 5,
    question: "Bagaimana cara memulai kerja sama?",
    answer:
      "Anda dapat menghubungi kami melalui form kontak, WhatsApp, atau email untuk konsultasi dan briefing awal.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 relative">
      <motion.div
        className="max-w-full mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3">
            Pertanyaan yang sering diajukan mengenai layanan dan portofolio
            kami.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4 max-w-8xl mx-auto px-6">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className=" bg-white shadow-sm rounded-xl p-6 cursor-pointer border border-gray-100 transition-all hover:shadow-md"
              onClick={() => toggleFAQ(item.id)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.question}
                </h3>

                <motion.span
                  animate={{ rotate: openIndex === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </div>

              {/* Smooth Answer */}
              <motion.div
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={
                  openIndex === item.id
                    ? { opacity: 1, maxHeight: 200 }
                    : { opacity: 0, maxHeight: 0 }
                }
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 mt-4">{item.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
