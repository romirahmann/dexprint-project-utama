/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSave, FiUpload, FiTrash2, FiPlus, FiLoader } from "react-icons/fi";
import ConfirmDeleteModal from "../../../shared/ConfirmDeleted";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";

export function BannerManagement() {
  const [selectedPage, setSelectedPage] = useState("product");
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [modal, setModal] = useState({ isOpen: false });
  const [isUploading, setIsUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputs = useRef([]);
  const { showAlert } = useAlert();

  // Fetch banners by page
  const fetchBanners = useCallback(async () => {
    try {
      const res = await api.get(`/master/banners?page=${selectedPage}`);
      setBanners(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  }, [selectedPage]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  useEffect(() => {
    const events = ["banner:create", "banner:update", "banner:delete"];
    events.forEach((event) => listenToUpdate(event, fetchBanners));
  }, [fetchBanners]);

  const triggerFileInput = (index) => {
    setIsEditMode(true);
    fileInputs.current[index]?.click();
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedBanners = [...banners];
    updatedBanners[index] = {
      ...updatedBanners[index],
      filePreview: URL.createObjectURL(file),
      newFile: file,
      new: true,
      bannerId: null,
    };
    setBanners(updatedBanners);
    setIsEditMode(true);
  };

  const handleAddBanner = () => {
    setIsEditMode(true);
    setBanners((prev) => [
      ...prev,
      {
        bannerId: null,
        page: selectedPage,
        filePreview: null,
        imageUrl: null,
        newFile: null,
        new: true,
      },
    ]);
  };

  const handleDeleteBanner = async () => {
    try {
      await api.delete(`/master/banner/${selectedBanner.bannerId}`);
      fetchBanners();
    } catch (error) {
      console.error(error);
    } finally {
      setModal({ isOpen: false });
    }
  };

  const handleSaveBanner = async () => {
    setIsUploading(true);
    try {
      for (let banner of banners.filter((b) => b.new && b.newFile)) {
        const formData = new FormData();
        formData.append("page", selectedPage);
        formData.append("file", banner.newFile);
        await api.post("/master/banner", formData);
      }
      showAlert("success", "Upload Banner Successfully!");
      setIsEditMode(false);
      fetchBanners();
    } catch (error) {
      showAlert("error", "Upload Banner failed!");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
      {/* Header: Page Selector */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Banner Page Management
        </h2>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
        >
          <option value="product">Product Page</option>
          <option value="portofolio">Portfolio Page</option>
          <option value="contact">Contact Page</option>
        </select>
      </div>

      {/* Add Banner */}
      <div className="mb-4">
        <button
          onClick={handleAddBanner}
          className="flex items-center gap-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FiPlus size={16} /> Add Banner
        </button>
      </div>

      {/* Banner List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnimatePresence>
          {banners.map((banner, i) => (
            <motion.div
              key={banner.bannerId || i}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative group rounded-xl overflow-hidden bg-gray-200 shadow-sm aspect-video"
            >
              <img
                src={
                  banner.filePreview || banner.imageUrl || "/placeholder.png"
                }
                alt={banner.title || "Banner"}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-3 transition">
                {/* Upload Button */}
                <button
                  onClick={() => triggerFileInput(i)}
                  className="bg-white hover:bg-orange-500 hover:text-white text-gray-700 p-2 rounded-full shadow"
                >
                  <FiUpload size={16} />
                </button>

                {/* Delete Existing */}
                {banner.bannerId && (
                  <button
                    onClick={() => {
                      setSelectedBanner(banner);
                      setModal({ isOpen: true });
                    }}
                    className="bg-white hover:bg-red-500 hover:text-white text-gray-700 p-2 rounded-full shadow"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => (fileInputs.current[i] = el)}
                onChange={(e) => handleImageChange(e, i)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Save Button */}
      {isEditMode && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveBanner}
            disabled={isUploading}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 transition"
          >
            {isUploading ? <FiLoader className="animate-spin" /> : <FiSave />}
            {isUploading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={modal.isOpen}
        onConfirm={handleDeleteBanner}
        onCancel={() => setModal({ isOpen: false })}
        message="Yakin ingin menghapus banner ini?"
      />
    </div>
  );
}
