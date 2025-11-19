/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";

export default function UserForm({ type = "ADD", initialData = {}, onCancel }) {
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    roleId: 3,
  });

  // Prefill data if EDIT mode
  useEffect(() => {
    if (type === "EDIT" && initialData) {
      setFormData({
        username: initialData.username || "",
        password: "",
        roleId: initialData.roleId || "",
      });
    }
  }, [type, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === "ADD") {
        await api.post("/master/user", formData);
        showAlert("success", "User berhasil ditambahkan!");
      } else {
        await api.put(`/master/user/${initialData.userId}`, formData);
        showAlert("success", "User berhasil diperbarui!");
      }
      onCancel();
    } catch (error) {
      showAlert("error", "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username */}
      <div>
        <label className="text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          required
        />
      </div>

      {/* Password (only required for ADD) */}
      {type === "ADD" && (
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={type === "EDIT" ? "Kosongkan jika tidak diubah" : ""}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required={type === "ADD"}
          />
        </div>
      )}

      {/* Role Select */}
      <div>
        <label className="text-sm font-medium text-gray-700">Role</label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          required
        >
          <option value="">Pilih Role</option>
          <option value="2">Admin</option>
          <option value="1">Developer</option>
          <option value="3">User</option>
        </select>
      </div>

      {/* Footer Button */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          disabled={isLoading}
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#FF7A00] hover:bg-[#ff8f2a]"
            }
          `}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>{type === "ADD" ? "Tambah" : "Simpan"}</>
          )}
        </button>
      </div>
    </form>
  );
}
