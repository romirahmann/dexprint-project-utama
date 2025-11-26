/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import api from "../../../services/axios.service";

export default function SimulasiPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [materialPrice, setMaterialPrice] = useState(null);

  const [length, setLength] = useState(1); // Panjang
  const [width, setWidth] = useState(1); // Lebar

  const [selectedFinishing, setSelectedFinishing] = useState("");
  const [totalPrice, setTotalPrice] = useState(null);

  const finishings = [
    { id: 1, name: "Glossy", price: 2000 },
    { id: 2, name: "Matte", price: 1500 },
    { id: 3, name: "Laminasi", price: 2500 },
  ];

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/master/products?limit=50");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Hitung total harga
  useEffect(() => {
    calculateTotal();
  }, [materialPrice, length, width, selectedFinishing]);

  const calculateTotal = () => {
    let total = 0;
    if (materialPrice && length && width) {
      total += materialPrice * length * width;
    }

    const finishing = finishings.find(
      (f) => f.id === Number(selectedFinishing)
    );
    if (finishing) total += finishing.price;

    setTotalPrice(total > 0 ? total : null);
  };

  // Ambil info produk yang dipilih
  const selectedProductData = products.find(
    (p) => p.productId === Number(selectedProduct)
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-lg ">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Simulasi Pesanan
      </h1>

      <div className="space-y-6">
        {/* Pilih Produk */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="block mb-2 font-semibold text-gray-700">
            Pilih Produk
          </label>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">-- Pilih Produk --</option>
              {products.map((p) => (
                <option key={p.productId} value={p.productId}>
                  {p.productName} - Rp {p.minprice.toLocaleString()}
                </option>
              ))}
            </select>
          )}
          {selectedProductData && selectedProductData.images?.[0]?.url && (
            <img
              src={selectedProductData.images[0].url}
              alt={selectedProductData.productName}
              className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Material */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="block mb-2 font-semibold text-gray-700">
            Material
          </label>
          <input
            type="text"
            placeholder="Nama Material"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Harga Material"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={materialPrice ?? ""}
            onChange={(e) =>
              setMaterialPrice(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          />
        </div>

        {/* Ukuran */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="block mb-2 font-semibold text-gray-700">
            Ukuran
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-600">Panjang</label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Lebar</label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Finishing */}
        <div className="bg-white rounded-xl shadow p-5">
          <label className="block mb-2 font-semibold text-gray-700">
            Finishing
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={selectedFinishing}
            onChange={(e) => setSelectedFinishing(e.target.value)}
          >
            <option value="">-- Pilih Finishing --</option>
            {finishings.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} - Rp {f.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Hasil Total */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center text-2xl font-bold text-indigo-700 shadow-inner">
          {totalPrice !== null
            ? `Total Harga: Rp ${totalPrice.toLocaleString()}`
            : "Masukkan Material dan Ukuran"}
        </div>
      </div>
    </div>
  );
}
