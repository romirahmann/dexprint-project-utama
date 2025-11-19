import { FiEdit2 } from "react-icons/fi";

export function SectionBlock({
  title,
  icon,
  isEditing,
  value,
  onChange,
  onEdit,
  onCancel,
  onSave,
  isSaving,
}) {
  return (
    <div className="mt-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs uppercase text-gray-600 font-semibold flex items-center gap-1">
          {icon} {title.charAt(0).toUpperCase() + title.slice(1)}
        </span>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-orange-500 transition"
          >
            <FiEdit2 size={16} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <textarea
            name={title}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none min-h-[100px]"
            value={value}
            onChange={onChange}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className={`px-4 py-2 rounded-lg text-sm text-white transition ${
                isSaving
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-sm whitespace-pre-line">
          {value || "-"}
        </p>
      )}
    </div>
  );
}
