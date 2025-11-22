/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useAlert } from "../../../../store/AlertContext";
import api from "../../../../services/axios.service";
import { listenToUpdate } from "../../../../services/socket.service";
import { Table } from "../../../../shared/Table";
import Modal from "../../../../shared/Modal";
import ConfirmDeleteModal from "../../../../shared/ConfirmDeleted";
import { FormMaterial } from "../../../../components/admin/products/materials/FormMaterial";

export function MaterialManagementPage() {
  const [materials, setMaterials] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMaterial = useCallback(async () => {
    try {
      const res = await api.get("/master/materials");
      setMaterials(res.data.data || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  });

  useEffect(() => {
    fetchMaterial();

    listenToUpdate("material:create", fetchMaterial);
    listenToUpdate("material:update", fetchMaterial);
    listenToUpdate("material:delete", fetchMaterial);
  }, [fetchMaterial]);

  const openModal = (type, material = null) => {
    setSelectedMaterial(material);
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
    setSelectedMaterial(null);
  };

  const handleDeleted = async () => {
    if (!selectedMaterial) return;

    setIsDeleting(true);

    try {
      await api.delete(`/master/material/${selectedMaterial.materialId}`);
      showAlert("success", "Deleted Material Successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", "Failed to Delete Material");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    { key: "no", label: "#" },
    { key: "materialName", label: "Material Name" },
    { key: "size", label: "Size" },
    { key: "unit", label: "Unit" },
    { key: "price", label: "Price" },
    { key: "productId", label: "Product ID" },
  ];

  const formattedData = materials.map((mat, index) => ({
    no: index + 1,
    ...mat,
  }));

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Material Management
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola seluruh material dengan mudah dan cepat.
          </p>
        </div>

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-72">
            <FaSearch className="text-gray-400" />
            <input
              placeholder="Cari material…"
              className="ml-2 w-full outline-none text-gray-700"
            />
          </div>
          <button
            onClick={() => openModal("ADD")}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md transition"
          >
            <FaPlus /> Add Material
          </button>
        </div>
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={formattedData}
        rowsPerPage={5}
        actionRenderer={(row) => (
          <div className="flex justify-center gap-3">
            <button onClick={() => openModal("EDIT", row)} className="btn-edit">
              <FaEdit />
            </button>
            <button
              onClick={() => openModal("DELETE", row)}
              className="btn-delete"
            >
              <FaTrash />
            </button>
          </div>
        )}
      />

      {/* ADD & EDIT MODAL */}
      {(modal.type === "ADD" || modal.type === "EDIT") && (
        <Modal
          title={`${modal.type} MATERIAL`}
          isOpen={modal.isOpen}
          onClose={closeModal}
        >
          <FormMaterial
            type={modal.type}
            initialData={selectedMaterial}
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
          message={`Material "${selectedMaterial?.materialName}" akan dihapus dan tidak dapat dikembalikan.`}
        />
      )}
    </div>
  );
}
