import dayjs from "dayjs";
import SaveCancelButtons from "./SaveCancellButton";

export function EditableField({
  label,
  name,
  icon,
  value,
  type = "text",
  editField,
  onEdit,
  onChange,
  onSave,
  onCancel,
  isSaving,
}) {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-2 text-gray-500">
        {icon}
        <span className="uppercase text-xs font-medium">{label}</span>
      </div>

      {editField === name ? (
        <div className="flex items-center gap-2">
          <input
            type={type}
            name={name}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
            value={
              type === "month" && value
                ? dayjs(value).format("YYYY-MM")
                : value || ""
            }
            onChange={onChange}
          />
          <SaveCancelButtons
            onSave={onSave}
            onCancel={onCancel}
            isSaving={isSaving}
          />
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <p className="text-gray-800 text-sm break-words">
            {type === "month" && value
              ? dayjs(value).format("MMMM YYYY") // contoh: Oktober 2023
              : value || "-"}
          </p>
          <button
            onClick={() => onEdit(name)}
            className="text-gray-400 hover:text-orange-500"
          >
            ✎
          </button>
        </div>
      )}
    </div>
  );
}
