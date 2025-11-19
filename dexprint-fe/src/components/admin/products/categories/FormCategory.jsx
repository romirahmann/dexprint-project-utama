/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useAlert } from "../../../../store/AlertContext";
import api from "../../../../services/axios.service";

export function FormCategory({ type = "ADD", initialData = null, onCancel }) {
  const { showAlert } = useAlert();
  const [form, setForm] = useState({
    categoryName: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // load initial data jika EDIT
  useEffect(() => {
    if (initialData) {
      setForm({
        categoryName: initialData.categoryName || "",
        file: null,
      });
      setPreview(initialData.img || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(initialData?.img || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.categoryName) {
      showAlert("error", "Category name is required!");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("categoryName", form.categoryName);
      if (form.file) formData.append("img", form.file);

      if (type === "ADD") {
        await api.post("/master/category", formData);
        showAlert("success", "Category added successfully!");
      } else if (type === "EDIT" && initialData?.categoryId) {
        await api.put(`/master/category/${initialData.categoryId}`, formData);
        showAlert("success", "Category updated successfully!");
      }

      onCancel(); // close modal
    } catch (err) {
      console.error(err);
      showAlert("error", "Failed to save category!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="categoryName"
        value={form.categoryName}
        onChange={handleChange}
        placeholder="Category Name"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
        required
      />

      <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all">
        <FiUpload className="text-gray-600" />
        <span className="text-gray-600">Upload Image (optional)</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <PhotoProvider>
          <PhotoView src={preview}>
            <div className="w-32 h-32 mt-2 cursor-pointer">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded border"
              />
            </div>
          </PhotoView>
        </PhotoProvider>
      )}

      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition disabled:opacity-50"
        >
          {isLoading
            ? "Saving..."
            : type === "ADD"
            ? "Add Category"
            : "Update Category"}
        </button>
      </div>
    </form>
  );
}
