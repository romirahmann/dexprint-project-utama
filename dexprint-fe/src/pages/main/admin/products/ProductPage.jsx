/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import api from "../../../../services/axios.service";
import Modal from "../../../../shared/Modal";
import ConfirmDeleteModal from "../../../../shared/ConfirmDeleted";
import { listenToUpdate } from "../../../../services/socket.service";
import { Table } from "../../../../shared/Table";
import { FormProduct } from "../../../../components/admin/products/FormAddProduct";
import { useAlert } from "../../../../store/AlertContext";
import { useRouter } from "@tanstack/react-router";

export function ProductPageManagement() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  // === Fetch Categories ===
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/master/categories");
        setCategories(res.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // === Fetch Products ===
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let query = `/master/products?limit=${limit}`;
      if (selectedCategory !== "all") {
        query += `&categoryId=${selectedCategory}`;
      }

      const res = await api.get(query);
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [limit, selectedCategory]);

  useEffect(() => {
    fetchProducts();
    const events = ["product:create", "product:update", "product:delete"];
    events.forEach((event) => listenToUpdate(event, fetchProducts));
  }, [fetchProducts]);

  // === SEARCH & FILTER ===
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" ||
      String(prod.categoryId) === String(selectedCategory);

    const matchesSearch =
      prod.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // === Modal Handlers ===
  const openModal = (type, product = null) => {
    setSelectedProduct(product);
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
    setSelectedProduct(null);
  };

  // === DELETE HANDLER ===
  const handleDeleted = async () => {
    if (!selectedProduct) return;
    setIsDeleting(true);
    try {
      await api.delete(`/master/product/${selectedProduct.productId}`);
      showAlert("success", "Product deleted successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  // === ACTION BUTTONS ===
  const actionRenderer = (row) => (
    <div className="flex justify-center gap-3">
      <button
        onClick={() =>
          router.navigate({
            to: "detail/$productId",
            params: { productId: row.productId },
            state: { product: row },
          })
        }
        className="p-2 border rounded-md hover:bg-green-50 transition"
      >
        <FiEye className="text-green-600" />
      </button>
      <button
        onClick={() => openModal("EDIT", row)}
        className="p-2 border rounded-md hover:bg-blue-50 transition"
      >
        <FiEdit2 className="text-blue-600" />
      </button>
      <button
        onClick={() => openModal("DELETE", row)}
        className="p-2 border rounded-md hover:bg-red-50 transition"
      >
        <FiTrash2 className="text-red-600" />
      </button>
    </div>
  );

  // === TABLE DATA ===
  const formattedData = filteredProducts.map((prod, index) => ({
    no: index + 1,
    ...prod,
  }));

  // === TABLE COLUMNS ===
  const columns = [
    { key: "no", label: "#" },
    { key: "productName", label: "Name" },
    { key: "categoryName", label: "Category" },
    {
      key: "minprice",
      label: "Min Price",
      render: (p) => `Rp ${p.toLocaleString()}`,
    },
    {
      key: "description",
      label: "Description",
      render: (d) => <span className="truncate block w-48">{d}</span>,
    },
  ];

  return (
    <div className="p-4 md:p-10 lg:w-full bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your product list efficiently
          </p>
        </div>

        <button
          onClick={() => openModal("ADD")}
          className="flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#ff8f2a] text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/6"
        >
          {[1, 20, 50, 100].map((n) => (
            <option key={n} value={n}>
              Show {n}
            </option>
          ))}
        </select> */}

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryId} - {cat.categoryName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
        />
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={formattedData}
        rowsPerPage={10}
        loading={loading}
        actionRenderer={actionRenderer}
      />

      {/* ADD / EDIT MODAL */}
      {(modal.type === "ADD" || modal.type === "EDIT") && (
        <Modal
          title={`${modal.type} Product`}
          isOpen={modal.isOpen}
          onClose={closeModal}
        >
          <FormProduct
            type={modal.type}
            initialData={selectedProduct}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {/* DELETE MODAL */}
      {modal.type === "DELETE" && (
        <ConfirmDeleteModal
          isOpen={modal.isOpen}
          onCancel={closeModal}
          onConfirm={handleDeleted}
          loading={isDeleting}
          message={`Product "${selectedProduct?.productName}" will be permanently deleted.`}
        />
      )}
    </div>
  );
}
