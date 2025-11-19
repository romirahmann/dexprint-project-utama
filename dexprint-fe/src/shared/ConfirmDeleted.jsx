/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function ConfirmDeleteModal({
  isOpen,
  onConfirm,
  onCancel,
  isLoading = false,
  message = "Apakah Anda yakin ingin menghapus data ini?",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Konfirmasi</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg transition ${
              isLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-white transition flex items-center justify-center ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            ) : (
              "Hapus"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
