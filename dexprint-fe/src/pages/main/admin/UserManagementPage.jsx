/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Table } from "../../../shared/Table";
import { useEffect, useState, useRef, useCallback } from "react";
import api from "../../../services/axios.service";
import Modal from "../../../shared/Modal";
import UserForm from "../../../components/admin/users/UserForm";
import ConfirmDeleteModal from "../../../shared/ConfirmDeleted";
import { listenToUpdate } from "../../../services/socket.service";
import { useAlert } from "../../../store/AlertContext";

export function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const { showAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/master/users");
      setUsers(res.data.data || []); // Replace, not append
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  });
  useEffect(() => {
    fetchUser();

    listenToUpdate("user_created", fetchUser);
    listenToUpdate("user_updated", fetchUser);
    listenToUpdate("user_deleted", fetchUser);
  }, [fetchUser]);

  const openModal = (type, user = null) => {
    setSelectedUser(user);
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
    setSelectedUser(null);
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
    { key: "username", label: "Username" },
    {
      key: "roleName",
      label: "Role",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value === "ADMIN" || value === "DEVELOPER"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const formattedData = users.map((user, index) => ({
    no: index + 1,
    ...user,
  }));

  const handleDeleted = async () => {
    if (!selectedUser) {
      showAlert("error", "User not selected!");
      return;
    }

    setIsDeleting(true); // ⬅️ start loading

    try {
      await api.delete(`/master/user/${selectedUser.userId}`);
      showAlert("success", "Deleted User Successfully!");
      closeModal();
    } catch (error) {
      showAlert("error", "Failed to Delete User");
    } finally {
      setIsDeleting(false); // ⬅️ stop loading
    }
  };

  return (
    <div className="p-4 md:p-10 lg:w-full bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Management User</h1>
          <p className="text-gray-600 mt-1">
            Kelola seluruh pengguna aplikasi dengan cepat dan mudah.
          </p>
        </div>

        {/* Search + Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm w-full sm:w-72">
            <FaSearch className="text-gray-400" />
            <input
              placeholder="Cari user…"
              className="ml-2 w-full outline-none text-gray-700"
            />
          </div>

          <button
            onClick={() => openModal("ADD")}
            className="flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#ff8f2a] text-white px-5 py-2 rounded-xl shadow-md transition"
          >
            <FaPlus /> Add User
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
          title={`${modal.type} USER`}
          isOpen={modal.isOpen}
          onClose={closeModal}
        >
          <UserForm
            type={modal.type}
            initialData={selectedUser}
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
          message={`User "${selectedUser?.username}" akan dihapus dan tidak dapat dikembalikan.`}
        />
      )}
    </div>
  );
}
