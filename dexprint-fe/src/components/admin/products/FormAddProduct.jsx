/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useAlert } from "../../../store/AlertContext";
import api from "../../../services/axios.service";

export function FormProduct({ type = "ADD", initialData = null, onCancel }) {
  const { showAlert } = useAlert();

  const [form, setForm] = useState({
    productName: "",
    categoryId: "",
    description: "",
    minprice: "",
    isThumbnail: false,
    videoUrl: "",
    files: [],
  });

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/master/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error(err);
        showAlert("error", "Failed to load categories!");
      }
    };
    fetchCategories();
  }, []);

  // Prefill form saat EDIT
  useEffect(() => {
    if (initialData) {
      setForm({
        productName: initialData.productName || "",
        categoryId: initialData.categoryId || "",
        description: initialData.description || "",
        minprice: initialData.minprice || "",
        isThumbnail: initialData.isThumbnail || false,
        videoUrl: initialData.videos[0].videoUrl || "",
        files: [],
      });
      setPreview(initialData.images || []);
    }
  }, [initialData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm({
      ...form,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  // Handle image upload (hanya untuk ADD)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productName || !form.categoryId || !form.minprice) {
      showAlert("error", "Product name, category, and price are required!");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();

      // Append form data except files
      Object.keys(form).forEach((key) => {
        if (key !== "files") formData.append(key, form[key]);
      });

      // Append multiple images hanya jika mode ADD
      if (type === "ADD") {
        form.files.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (type === "ADD") {
        await api.post("/master/product", formData);
        showAlert("success", "Product added successfully!");
      } else if (type === "EDIT" && initialData?.productId) {
        await api.put(`/master/product/${initialData.productId}`, formData);
        showAlert("success", "Product updated successfully!");
      }

      onCancel();
    } catch (err) {
      console.error(err);
      showAlert("error", "Failed to save product!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Product Name */}
      <input
        name="productName"
        value={form.productName}
        onChange={handleChange}
        placeholder="Product Name"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
        required
      />

      {/* Category */}
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.categoryId} value={cat.categoryId}>
            {cat.categoryName}
          </option>
        ))}
      </select>

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="3"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm"
      />

      {/* Minimum Price */}
      <input
        name="minprice"
        type="number"
        value={form.minprice}
        onChange={handleChange}
        placeholder="Minimum Price"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
        required
      />

      {/* Video URL */}
      <input
        name="videoUrl"
        value={form.videoUrl}
        onChange={handleChange}
        placeholder="Video URL (Optional)"
        className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 p-2 rounded-lg text-gray-700 shadow-sm transition-all"
      />

      {/* isThumbnail */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isThumbnail"
          checked={form.isThumbnail}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="text-gray-600">Set as Thumbnail</span>
      </label>

      {/* Upload Multiple Images hanya untuk ADD */}
      {type === "ADD" && (
        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all">
          <FiUpload className="text-gray-600" />
          <span className="text-gray-600">
            Upload Product Images (Multiple)
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* Preview Images */}
      {type === "ADD" && preview.length > 0 && (
        <PhotoProvider>
          <div className="flex gap-3 flex-wrap mt-2">
            {preview.map((src, index) => (
              <PhotoView key={index} src={src.url || src}>
                <img
                  src={src.url || src}
                  alt={`Preview-${index}`}
                  className="w-32 h-32 object-cover rounded border cursor-pointer"
                />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      )}

      {/* Buttons */}
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
            ? "Add Product"
            : "Update Product"}
        </button>
      </div>
    </form>
  );
}
