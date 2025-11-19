/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useAlert } from "../../../../store/AlertContext";
import api from "../../../../services/axios.service";

export function FormAddClient({ onSuccess, onClose }) {
  const [clientName, setClientName] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showAlert } = useAlert();

  // Preview image saat user pilih file
  useEffect(() => {
    if (logo) {
      const url = URL.createObjectURL(logo);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [logo]);

  const validate = () => {
    const newErrors = {};

    if (!clientName || clientName.trim().length < 2) {
      newErrors.clientName = "Client name must be at least 2 characters";
    }

    if (!logo) {
      newErrors.logo = "Logo is required";
    } else {
      if (logo.size > 2 * 1024 * 1024) {
        newErrors.logo = "Max file size is 2MB";
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(logo.type)) {
        newErrors.logo = "Only JPG, PNG, or WEBP allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", clientName.trim());
      formData.append("logo", logo);

      await api.post("/master/client", formData);

      showAlert("success", "Insert Client Successfully!");
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      showAlert("error", "Insert Client failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Client Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Enter client name"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${
            errors.clientName ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.clientName && (
          <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
        )}
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo
        </label>
        <div
          onClick={() => document.getElementById("logo").click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-orange-50 transition-all ${
            errors.logo
              ? "border-red-400 bg-red-50"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-contain mb-2"
            />
          ) : (
            <>
              <FiUploadCloud size={36} className="text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">Click to upload logo</p>
            </>
          )}
        </div>

        <input
          type="file"
          id="logo"
          accept="image/*"
          className="hidden"
          onChange={(e) => setLogo(e.target.files?.[0] || null)}
        />

        {errors.logo && (
          <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
