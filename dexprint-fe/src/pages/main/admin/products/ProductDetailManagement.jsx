/* eslint-disable no-unused-vars */
import { useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import api from "../../../../services/axios.service";
import { listenToUpdate } from "../../../../services/socket.service";
import { useAlert } from "../../../../store/AlertContext";

export function ProductDetailManagement() {
  const { productId } = useParams({});
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const { showAlert } = useAlert();
  const router = useRouter();

  const fetchProductById = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    try {
      const res = await api.get(`/master/product/${productId}`);
      setProduct(res.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductById();
    const events = ["product:image:add", "product:image:delete"];
    events.forEach((event) => listenToUpdate(event, fetchProductById));
  }, [fetchProductById]);

  const handleAddImages = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewImages(previews);
  };

  const handleUploadImages = async () => {
    if (!previewImages.length) return;

    const formData = new FormData();
    previewImages.forEach((img) => formData.append("images", img.file));

    setUploading(true);
    try {
      await api.post(`/master/product/${productId}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreviewImages([]);
      fetchProductById();
      showAlert("success", "Add Image Successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      showAlert("error", "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/master/product/image/${imageId}`);
      fetchProductById();
      showAlert("success", "Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      showAlert("error", "Failed to delete image");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!product)
    return (
      <div className="p-6 text-center text-red-600">Product not found!</div>
    );

  const activeImage = product.images?.[0]?.url || "";

  return (
    <>
      {/* Back Button */}
      <div className="mb-6 flex items-center">
        <button
          onClick={() => router.navigate({ to: "/admin/products" })}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <span className="text-xl">⬅</span>
          <span className="font-medium">Kembali</span>
        </button>
      </div>

      <div className="bg-gray-50 py-6 px-4 md:px-8 lg:px-12 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6 border-b pb-6">
            <img
              src={activeImage}
              alt={product.productName}
              className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {product.productName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Kategori:{" "}
                  <span className="font-medium">{product.categoryName}</span>
                </p>
                <p className="text-lg font-semibold text-blue-600 mt-2">
                  Rp {Number(product.minprice).toLocaleString()}
                </p>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="py-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">Galeri Produk</h2>
              <label className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                <FaPlus /> {uploading ? "Uploading..." : "Add Image"}
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleAddImages}
                />
              </label>
            </div>

            <PhotoProvider>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {/* Existing Images */}
                {product.images?.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <PhotoView src={img.url}>
                      <img
                        src={img.url}
                        alt={`Product img ${idx}`}
                        className="w-full h-40 md:h-48 lg:h-50 object-cover rounded-md cursor-pointer shadow-sm transition-transform duration-200 hover:scale-105"
                      />
                    </PhotoView>
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition">
                      <button className="mx-1 p-2 bg-white rounded-full shadow hover:bg-gray-100">
                        <FiEye className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(img.imgId)}
                        className="mx-1 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <FiTrash2 className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Preview Images */}
                {previewImages.map((img, idx) => (
                  <div key={`preview-${idx}`} className="relative group">
                    <PhotoView src={img.url}>
                      <img
                        src={img.url}
                        alt={`Preview img ${idx}`}
                        className="w-full h-40 md:h-48 lg:h-50 object-cover rounded-md cursor-pointer shadow-sm transition-transform duration-200 hover:scale-105 opacity-80"
                      />
                    </PhotoView>
                  </div>
                ))}
              </div>
            </PhotoProvider>

            {previewImages.length > 0 && (
              <button
                onClick={handleUploadImages}
                className="mt-3 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Upload {previewImages.length} Image
              </button>
            )}
          </div>

          {/* Video */}
          <div className="py-6">
            <h2 className="text-xl font-semibold mb-3">Video Produk</h2>
            <div className="grid grid-cols-1 gap-4">
              {product.videos?.map((vid, idx) => (
                <iframe
                  key={idx}
                  src={vid.videoUrl.replace("watch?v=", "embed/")}
                  title={`Video ${idx}`}
                  className="w-full h-72 md:h-96 rounded-lg shadow"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
