/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAlert } from "../../../../store/AlertContext";
import api from "../../../../services/axios.service";

export function FormMaterial({ type = "ADD", initialData = null, onCancel }) {
  const { showAlert } = useAlert();

  const [form, setForm] = useState({
    materialName: "",
    size: "",
    unit: "",
    price: "",
    productId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]); // <-- NEW

  // Load product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/master/products");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  // Load data ketika EDIT
  useEffect(() => {
    if (initialData) {
      setForm({
        materialName: initialData.materialName || "",
        size: initialData.size || "",
        unit: initialData.unit || "",
        price: initialData.price || "",
        productId: initialData.productId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.materialName || !form.unit || !form.price) {
      showAlert("error", "Please fill required fields!");
      return;
    }

    setIsLoading(true);
    try {
      if (type === "ADD") {
        await api.post("/master/material", form);
        showAlert("success", "Material added successfully!");
      } else if (type === "EDIT" && initialData?.materialId) {
        await api.put(`/master/material/${initialData.materialId}`, form);
        showAlert("success", "Material updated successfully!");
      }

      onCancel(); // close modal
    } catch (err) {
      showAlert("error", "Failed to save material!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="materialName"
        value={form.materialName}
        onChange={handleChange}
        placeholder="Material Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size (optional)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />

        <input
          name="unit"
          value={form.unit}
          onChange={handleChange}
          placeholder="Unit (e.g. Meter, Pcs)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          required
        />
      </div>

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        required
      />

      {/* NEW: Select Product */}
      <select
        name="productId"
        value={form.productId}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
      >
        <option value="">Select Product (Optional)</option>
        {products.map((prod) => (
          <option key={prod.productId} value={prod.productId}>
            {prod.productName}
          </option>
        ))}
      </select>

      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 shadow-sm transition"
        >
          {isLoading
            ? "Saving..."
            : type === "ADD"
            ? "Add Material"
            : "Update Material"}
        </button>
      </div>
    </form>
  );
}
