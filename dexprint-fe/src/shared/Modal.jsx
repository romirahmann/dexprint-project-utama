/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, title, children, footer }) {
  if (typeof isOpen === "undefined") return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[480px] max-w-lg p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 transition text-lg"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="text-gray-700">{children}</div>

            {/* Footer (Optional) */}
            {footer && <div className="mt-6 border-t pt-4">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
