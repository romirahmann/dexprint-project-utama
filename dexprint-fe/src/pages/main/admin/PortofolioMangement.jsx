/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useRouter } from "@tanstack/react-router";
import api from "../../../services/axios.service";
import Modal from "../../../shared/Modal";
import ConfirmDeleteModal from "../../../shared/ConfirmDeleted";
import { listenToUpdate } from "../../../services/socket.service";
import { useAlert } from "../../../store/AlertContext";
import { Table } from "../../../shared/Table";
import { FormPortofolio } from "../../../components/admin/portofolio/FormPortofolio";

export function PortofolioManagement() {
  const [portfolios, setPortfolios] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/master/products");
        setProducts(res.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // === Fetch Portfolios ===
  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/master/portfolios`);
      setPortfolios(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
    ["portfolio:create", "portfolio:update", "portfolio:delete"].forEach(
      (event) => listenToUpdate(event, fetchPortfolios)
    );
  }, [fetchPortfolios]);

  // === Filter Data di Frontend ===
  const filteredPortfolios = portfolios.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      String(item.categoryId) === String(selectedCategory);

    const matchesProduct =
      selectedProduct === "all" ||
      String(item.productId) === String(selectedProduct);

    const searchLower = search.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      item.portoName?.toLowerCase().includes(searchLower) ||
      item.categoryName?.toLowerCase().includes(searchLower) ||
      item.productName?.toLowerCase().includes(searchLower) ||
      item.client?.toLowerCase()?.includes(searchLower) ||
      String(item.portofolioId).includes(searchLower);

    return matchesCategory && matchesProduct && matchesSearch;
  });

  // === Modal Handlers ===
  const openModal = (type, portfolio = null) => {
    setSelectedPortfolio(portfolio);
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
    setSelectedPortfolio(null);
  };

  // === DELETE HANDLER ===
  const handleDeleted = async () => {
    if (!selectedPortfolio) return;
    setIsDeleting(true);
    try {
      await api.delete(`/master/portfolio/${selectedPortfolio.portofolioId}`);
      showAlert("success", "Portfolio deleted successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", "Failed to delete portfolio");
    } finally {
      setIsDeleting(false);
    }
  };

  // === ACTION BUTTONS ===
  const actionRenderer = (row) => (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => {
          router.navigate({
            to: "detail/$portofolioId/management",
            params: { portofolioId: row.portofolioId },
          });
        }}
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
  const formattedData = filteredPortfolios.map((p, index) => ({
    no: index + 1,
    ...p,
    image: p.images?.find((img) => img?.isThumbnail)?.url || null,
  }));

  // === TABLE COLUMNS ===
  const columns = [
    {
      key: "no",
      label: "#",
      render: (d) => <span className="flex justify-center w-10">{d}</span>,
    },
    { key: "portoName", label: "Name" },
    { key: "categoryName", label: "Category" },
    { key: "productName", label: "Product" },
  ];

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Portofolio Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your portfolio list efficiently
          </p>
        </div>
        <button
          onClick={() => openModal("ADD")}
          className="flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#ff8f2a] text-white px-5 py-2 rounded-xl shadow-md transition"
        >
          <FiPlus /> Add Portfolio
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/6"
        >
          {[10, 20, 50, 100].map((n) => (
            <option key={n} value={n}>
              Show {n}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4"
        >
          <option value="all">All Products</option>
          {products.map((prod) => (
            <option key={prod.productId} value={prod.productId}>
              {prod.productName}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4"
        />
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={formattedData.slice(0, limit)}
        rowsPerPage={limit}
        loading={loading}
        actionRenderer={actionRenderer}
      />

      {/* ADD / EDIT MODAL */}
      {(modal.type === "ADD" || modal.type === "EDIT") && (
        <Modal
          title={`${modal.type} Portfolio`}
          isOpen={modal.isOpen}
          onClose={closeModal}
        >
          <FormPortofolio
            type={modal.type}
            initialData={selectedPortfolio}
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
          message={`Portfolio "${selectedPortfolio?.portoName}" will be permanently deleted.`}
          loading={isDeleting}
        />
      )}
    </div>
  );
}
