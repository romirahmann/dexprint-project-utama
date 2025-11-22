/* eslint-disable no-unused-vars */
import { useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { FiArrowLeft, FiEye, FiTrash2 } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import api from "../../../../services/axios.service";
import { listenToUpdate } from "../../../../services/socket.service";
import { useAlert } from "../../../../store/AlertContext";
import ConfirmDeleteModal from "../../../../shared/ConfirmDeleted";

export function PortoDetailManagement() {
  const { portofolioId } = useParams({});
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [confirmData, setConfirmData] = useState({
    open: false,
    imageId: null,
  });
  const { showAlert } = useAlert();
  const router = useRouter();

  /** FETCH PORTFOLIO */
  const fetchPortfolioById = useCallback(async () => {
    if (!portofolioId) return;
    setLoading(true);
    try {
      const res = await api.get(`/master/portfolio/${portofolioId}`);
      setPortfolio(res.data.data);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setPortfolio(null);
    } finally {
      setLoading(false);
    }
  }, [portofolioId]);

  useEffect(() => {
    fetchPortfolioById();
    ["portfolio:image:add", "portfolio:image:delete"].forEach((event) =>
      listenToUpdate(event, fetchPortfolioById)
    );
  }, [fetchPortfolioById]);

  /** PREVIEW IMAGES BEFORE UPLOAD */
  const handleAddImages = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
    e.target.value = null;
  };

  /** HANDLE UPLOAD NEW IMAGES */
  const handleUploadImages = async () => {
    if (!previewImages.length) return;

    const formData = new FormData();
    previewImages.forEach((img) => formData.append("images", img.file));

    setUploading(true);
    try {
      await api.post(`/master/portofolio/${portofolioId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreviewImages([]);
      showAlert("success", "Images uploaded successfully!");
    } catch (error) {
      showAlert("error", "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  /** OPEN CONFIRM MODAL (Instead of window.confirm) */
  const confirmDeleteImage = (imageId) => {
    setConfirmData({ open: true, imageId });
  };

  /** EXECUTE DELETE AFTER CONFIRM */
  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/master/portfolio/image/${confirmData.imageId}`);
      showAlert("success", "Image deleted!");
    } catch {
      showAlert("error", "Failed to delete image");
    } finally {
      setConfirmData({ open: false, imageId: null });
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading...</div>;

  if (!portfolio)
    return (
      <div className="text-center text-red-600 py-10">Portfolio not found!</div>
    );

  return (
    <div className="px-6 py-6">
      {/* Back Button */}
      <button
        onClick={() => router.navigate({ to: "/admin/portofolio" })}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
      >
        <FiArrowLeft className="text-xl" />
        <span className="font-medium">Back to Portfolios</span>
      </button>

      {/* Confirm Modal */}
      <ConfirmDeleteModal
        isOpen={confirmData.open}
        title="Delete Image"
        message="Are you sure you want to permanently delete this image?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmData({ open: false, imageId: null })}
      />

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Portfolio Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {portfolio.portfolioName}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Category", value: portfolio.categoryName },
              { label: "Product", value: portfolio.productName },
              { label: "Client", value: portfolio.client || "-" },
              {
                label: "Date",
                value: new Date(portfolio.doDate).toLocaleDateString(),
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {portfolio.portoDesc}
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="pt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gallery</h2>

            <label className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
              <FaPlus /> {uploading ? "Uploading..." : "Add Images"}
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleAddImages}
              />
            </label>
          </div>

          <PhotoProvider>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {portfolio.images?.map((img) => (
                <div
                  key={img.id}
                  className="relative group rounded-lg overflow-hidden shadow-md"
                >
                  <PhotoView src={img.url}>
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-[20em] object-cover rounded-lg transition-transform group-hover:scale-105 cursor-pointer"
                    />
                  </PhotoView>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
                    <PhotoView src={img.url}>
                      <button className="p-2 rounded-full bg-white/70 hover:bg-white transition">
                        <FiEye className="text-gray-800 text-xl" />
                      </button>
                    </PhotoView>
                    <button
                      onClick={() => confirmDeleteImage(img.id)}
                      className="p-2 rounded-full bg-white/70 hover:bg-white transition"
                    >
                      <FiTrash2 className="text-red-600 text-xl" />
                    </button>
                  </div>
                </div>
              ))}

              {previewImages.map((img) => (
                <div
                  key={img.id}
                  className="relative rounded-lg overflow-hidden opacity-80"
                >
                  <img
                    src={img.url}
                    alt="preview"
                    className="w-full h-[20em] object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </PhotoProvider>

          {previewImages.length > 0 && (
            <button
              onClick={handleUploadImages}
              disabled={uploading}
              className="mt-6 w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              {uploading
                ? "Uploading..."
                : `Upload ${previewImages.length} Images`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
