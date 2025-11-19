/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiUpload, FiPlus } from "react-icons/fi";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";
import api from "../../../services/axios.service";
import Modal from "../../../shared/Modal";
import { FormAddClient } from "./form/FormAddClient";

export function ClientSection() {
  const [clients, setClients] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // ⬅️ Track loading delete
  const { showAlert } = useAlert();
  const fileInputs = useRef([]);
  const [modal, setModal] = useState({ isOpen: false, type: "ADD" });

  useEffect(() => {
    fetchClients();
    const events = ["client:create", "client:update", "client:delete"];
    events.forEach((event) => listenToUpdate(event, fetchClients));
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get("/master/clients");
      setClients(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.put(`/master/client/${id}`, formData);
      showAlert("success", "Client logo updated!");
      fetchClients();
    } catch {
      showAlert("error", "Failed to update logo!");
    }
  };

  const handleDeleteClient = async (id) => {
    setLoadingId(id); // ⬅️ Start loading
    try {
      await api.delete(`/master/client/${id}`);
      showAlert("success", "Client deleted!");
      fetchClients();
    } catch {
      showAlert("error", "Failed to delete client!");
    } finally {
      setLoadingId(null); // ⬅️ Stop loading
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Client Showcase</h2>
        <button
          onClick={() => setModal({ isOpen: true, type: "ADD" })}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          <FiPlus size={16} /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        <AnimatePresence>
          {clients.map((client, i) => (
            <motion.div
              key={client.clientId}
              layout
              className="relative group aspect-square border border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={client.clientLogo}
                alt="Client Logo"
                className="max-h-20 object-contain transition-all group-hover:opacity-70"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all">
                <button
                  onClick={() => fileInputs.current[i].click()}
                  className="bg-white p-2 rounded-full shadow hover:bg-orange-500 hover:text-white"
                  disabled={loadingId === client.clientId}
                >
                  <FiUpload />
                </button>

                <button
                  onClick={() => handleDeleteClient(client.clientId)}
                  className={`bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white flex items-center justify-center ${
                    loadingId === client.clientId &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={loadingId === client.clientId}
                >
                  {loadingId === client.clientId ? (
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiTrash2 />
                  )}
                </button>
              </div>

              <input
                type="file"
                className="hidden"
                ref={(el) => (fileInputs.current[i] = el)}
                onChange={(e) => handleFileChange(e, client.clientId)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {modal.type === "ADD" && (
          <Modal
            isOpen={modal.isOpen}
            title={`${modal.type} Client`}
            onClose={() => setModal({ isOpen: false, type: "ADD" })}
          >
            <FormAddClient
              onSuccess={() => setModal({ isOpen: false, type: "" })}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
