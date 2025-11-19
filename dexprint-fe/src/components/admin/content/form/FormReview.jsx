/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import api from "../../../../services/axios.service";
import { useAlert } from "../../../../store/AlertContext";

export function FormReview({ onSuccess }) {
  const { showAlert } = useAlert();
  const [form, setForm] = useState({
    name: "",
    tenant: "",
    feedback: "",
    file: null,
  });

  const [preview, setPreview] = useState(null); // Preview image
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });

    // Generate preview
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("tenant", form.tenant);
      formData.append("feedback", form.feedback);
      if (form.file) formData.append("file", form.file);

      await api.post("/master/review", formData);
      showAlert("success", "Review added!");
      onSuccess();
    } catch (err) {
      showAlert("error", "Failed to add review!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
      />

      <input
        name="tenant"
        value={form.tenant}
        onChange={handleChange}
        placeholder="Tenant / Company"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
      />

      <textarea
        name="feedback"
        value={form.feedback}
        onChange={handleChange}
        placeholder="Write your review..."
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg min-h-[90px] text-gray-700 shadow-sm transition-all"
        required
      />

      <label className="flex flex-col items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all">
        <FiUpload className="text-gray-600" />
        <span className="text-gray-600">Upload Profile (optional)</span>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      {preview && (
        <div className="w-28 h-28 rounded-full overflow-hidden border shadow-sm mx-auto">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-orange-500 text-white py-2.5 rounded-lg hover:bg-orange-600 shadow-sm transition-all disabled:bg-orange-300"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Review"}
      </button>
    </form>
  );
}
