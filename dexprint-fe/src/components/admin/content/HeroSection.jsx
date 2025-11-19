/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSave, FiUpload, FiTrash2, FiPlus, FiLoader } from "react-icons/fi";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";
import api from "../../../services/axios.service";
import ConfirmDeleteModal from "../../../shared/ConfirmDeleted";

export function HeroSection() {
  const [hero, setHero] = useState({ banners: [] });
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: "" });
  const { showAlert } = useAlert();
  const fileInputs = useRef([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditBanner, setIsEditBanner] = useState(false);

  useEffect(() => {
    fetchHeroIMG();
    ["hero:create", "hero:update", "hero:delete"].forEach((event) =>
      listenToUpdate(event, fetchHeroIMG)
    );
  }, []);

  const fetchHeroIMG = async () => {
    try {
      const res = await api.get("/master/heros");
      // console.log(res.data.data);
      setHero((prev) => ({ ...prev, banners: res.data.data }));
    } catch (error) {
      console.error(error);
    }
  };

  const triggerFileInput = (index) => {
    setIsEditBanner(true);
    fileInputs.current[index]?.click();
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showAlert("error", "Max file size 2MB!");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showAlert("error", "Only JPG, PNG, WEBP allowed!");
      return;
    }

    const updatedBanners = [...hero.banners];
    updatedBanners[index] = {
      ...updatedBanners[index],
      file: URL.createObjectURL(file),
      newFile: file,
    };

    setHero({ ...hero, banners: updatedBanners });
  };

  const handleAddBanner = () => {
    setIsEditBanner(true);
    setHero((prev) => ({
      ...prev,
      banners: [...prev.banners, { file: null, new: true }],
    }));
  };

  const handleDeleteBanner = async () => {
    if (selectedBanner === null) return;
    const updatedBanners = hero.banners.filter((_, i) => i !== selectedBanner);
    setHero({ ...hero, banners: updatedBanners });
    try {
      // console.log(selectedBanner);
      await api.delete(`/master/hero/${selectedBanner.bannerId}`);
      setModal({ isOpen: false, type: "" });
      setSelectedBanner(null);
      showAlert("success", "Banner deleted!");
    } catch (error) {
      showAlert("error", "Deleted failed!");
      console.log(error);
    }
  };

  const handleSaveBanner = async () => {
    try {
      setIsUploading(true);
      const formData = new FormData();

      fileInputs.current.forEach((input) => {
        if (input && input.files.length > 0) {
          formData.append("files", input.files[0]);
        }
      });

      await api.post("/master/hero", formData);
      showAlert("success", "Banner updated successfully!");
      setIsEditBanner(false);
      fetchHeroIMG();
    } catch (err) {
      showAlert("error", "Upload failed, please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Hero Banner Management
        </h2>
        <button
          onClick={handleAddBanner}
          className="flex items-center gap-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FiPlus size={16} /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AnimatePresence>
          {hero.banners.map((banner, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative group rounded-xl overflow-hidden bg-gray-100 shadow-sm"
            >
              <img
                src={banner.file}
                alt="Banner"
                className="w-full h-full object-cover aspect-video group-hover:opacity-90 transition"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-3 transition">
                <button
                  onClick={() => triggerFileInput(i)}
                  className="bg-white hover:bg-orange-500 hover:text-white text-gray-700 p-2 rounded-full shadow"
                >
                  <FiUpload size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedBanner(banner);
                    setModal({ isOpen: true, type: "DELETE" });
                  }}
                  className="bg-white hover:bg-red-500 hover:text-white text-gray-700 p-2 rounded-full shadow"
                >
                  <FiTrash2 size={16} />
                </button>
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

      {isEditBanner && (
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

      <ConfirmDeleteModal
        isOpen={modal.isOpen}
        onConfirm={handleDeleteBanner}
        onCancel={() => setModal({ isOpen: false, type: "" })}
        message="Kamu yakin mau hapus banner ini?"
      />
    </div>
  );
}
