import { FiSave, FiX } from "react-icons/fi";

export default function SaveCancelButtons({ onSave, onCancel, isSaving }) {
  return (
    <>
      <button
        onClick={onSave}
        disabled={isSaving}
        className={`p-2 rounded-lg transition ${
          isSaving
            ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}
      >
        <FiSave size={16} />
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-300 transition"
      >
        <FiX size={16} />
      </button>
    </>
  );
}
