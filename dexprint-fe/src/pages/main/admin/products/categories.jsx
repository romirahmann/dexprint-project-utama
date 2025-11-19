/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
// nanti kita buat form nya
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useAlert } from "../../../../store/AlertContext";
import api from "../../../../services/axios.service";
import { listenToUpdate } from "../../../../services/socket.service";
import { Table } from "../../../../shared/Table";
import Modal from "../../../../shared/Modal";
import ConfirmDeleteModal from "../../../../shared/ConfirmDeleted";
import { FormCategory } from "../../../../components/admin/products/categories/FormCategory";

export function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategory = useCallback(async () => {
    try {
      const res = await api.get("/master/categories");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  });

  useEffect(() => {
    fetchCategory();

    listenToUpdate("category:create", fetchCategory);
    listenToUpdate("category:update", fetchCategory);
    listenToUpdate("category:delete", fetchCategory);
  }, [fetchCategory]);

  const openModal = (type, category = null) => {
    setSelectedCategory(category);
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
    setSelectedCategory(null);
  };

  const handleDeleted = async () => {
    if (!selectedCategory) {
      showAlert("error", "Category not selected!");
      return;
    }

    setIsDeleting(true);

    try {
      await api.delete(`/master/category/${selectedCategory.categoryId}`);
      showAlert("success", "Deleted Category Successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", "Failed to Delete Category");
    } finally {
      setIsDeleting(false);
    }
  };

  const actionRenderer = (row) => (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => openModal("EDIT", row)}
        className="p-2 border rounded-md hover:bg-yellow-50 transition"
      >
        <FaEdit className="text-yellow-600" />
      </button>
      <button
        onClick={() => openModal("DELETE", row)}
        className="p-2 border rounded-md hover:bg-red-50 transition"
      >
        <FaTrash className="text-red-600" />
      </button>
    </div>
  );

  const columns = [
    { key: "no", label: "#" },
    { key: "categoryName", label: "Category Name" },
    {
      key: "img",
      label: "Image",
      render: (src) =>
        src ? (
          <PhotoProvider>
            <PhotoView src={src}>
              <img
                src={src}
                alt="Category"
                className="w-12 h-12 object-cover rounded cursor-pointer border"
              />
            </PhotoView>
          </PhotoProvider>
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        ),
    },
  ];

  const formattedData = categories.map((cat, index) => ({
    no: index + 1,
    ...cat,
    img: cat.img, // kolom image
  }));

  return (
    <div className="p-4 md:p-10 lg:w-full bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Management Category
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola seluruh kategori dengan mudah dan cepat.
          </p>
        </div>

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-72">
            <FaSearch className="text-gray-400" />
            <input
              placeholder="Cari kategori…"
              className="ml-2 w-full outline-none text-gray-700"
            />
          </div>

          <button
            onClick={() => openModal("ADD")}
            className="flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#ff8f2a] text-white px-5 py-2 rounded-xl shadow-md transition"
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={formattedData}
        rowsPerPage={5}
        actionRenderer={actionRenderer}
      />

      {/* ADD & EDIT MODAL */}
      {(modal.type === "ADD" || modal.type === "EDIT") && (
        <Modal
          title={`${modal.type} CATEGORY`}
          isOpen={modal.isOpen}
          onClose={closeModal}
        >
          <FormCategory
            type={modal.type}
            initialData={selectedCategory}
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
          message={`Category "${selectedCategory?.categoryName}" akan dihapus dan tidak dapat dikembalikan.`}
        />
      )}
    </div>
  );
}
