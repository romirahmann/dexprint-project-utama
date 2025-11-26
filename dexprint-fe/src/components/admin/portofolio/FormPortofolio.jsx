/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useAlert } from "../../../store/AlertContext";
import api from "../../../services/axios.service";

export function FormPortofolio({ type = "ADD", initialData = null, onCancel }) {
  const { showAlert } = useAlert();

  const [form, setForm] = useState({
    portoName: "",
    portoDesc: "",
    productId: "",
    doDate: "",
    client: "",
    files: [],
  });

  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load products (for dropdown)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/master/products");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error(err);
        showAlert("error", "Failed to load products!");
      }
    };
    fetchProducts();
  }, []);

  // Prefill form saat EDIT
  useEffect(() => {
    if (initialData) {
      setForm({
        portoName: initialData.portoName || "",
        portoDesc: initialData.portoDesc || "",
        productId: initialData.productId || "",
        doDate: initialData.doDate?.split("T")[0] || "", // format ke YYYY-MM-DD
        client: initialData.client || "",
        isThumbnail:
          initialData.portfolioFiles?.some((f) => f.isThumbnail) || false,
        files: [],
      });
      setPreview(initialData.portfolioFiles || []);
    }
  }, [initialData]);

  // Handle Input
  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm({
      ...form,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.portoName) {
      showAlert("error", "Portfolio name is required!");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "files") formData.append(key, form[key]);
      });

      if (type === "ADD") {
        form.files.forEach((file) => {
          formData.append("images", file);
        });
      }

      if (type === "ADD") {
        await api.post("/master/portofolio", formData);
        showAlert("success", "Portfolio added successfully!");
      } else if (type === "EDIT" && initialData?.portofolioId) {
        await api.put(
          `/master/portfolio/${initialData.portofolioId}`,
          formData
        );
        showAlert("success", "Portfolio updated successfully!");
      }

      onCancel();
    } catch (err) {
      console.error(err);
      showAlert("error", "Failed to save portfolio!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Portfolio Name */}
      <input
        name="portoName"
        value={form.portoName}
        onChange={handleChange}
        placeholder="Portfolio Name"
        className="border border-gray-200 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
        required
      />

      {/* Description */}
      <textarea
        name="portoDesc"
        value={form.portoDesc}
        onChange={handleChange}
        placeholder="Portfolio Description"
        rows="3"
        className="border border-gray-200 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
      />

      {/* Product */}
      <select
        name="productId"
        value={form.productId}
        onChange={handleChange}
        className="border border-gray-200 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
      >
        <option value="">Select Product</option>
        {products.map((prod) => (
          <option key={prod.productId} value={prod.productId}>
            {prod.productName}
          </option>
        ))}
      </select>

      {/* Do Date */}
      <input
        type="date"
        name="doDate"
        value={form.doDate}
        onChange={handleChange}
        className="border border-gray-200 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
      />

      {/* Client */}
      <input
        name="client"
        value={form.client}
        onChange={handleChange}
        placeholder="Client Name"
        className="border border-gray-200 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
      />

      {/* Upload Images */}
      {type === "ADD" && (
        <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-lg border hover:border-orange-400 hover:bg-orange-50 transition-all">
          <FiUpload className="text-gray-600" />
          <span className="text-gray-600">Upload Portfolio Images</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* Preview */}
      {preview.length > 0 && (
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
            ? "Add Portfolio"
            : "Update Portfolio"}
        </button>
      </div>
    </form>
  );
}
