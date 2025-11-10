const reviewModel = require("../../models/review.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");
const cloud = require("../../helper/cloudinary");

/* ============================================================
   ✅ GET ALL REVIEWS
============================================================ */
const getAllReview = async (req, res) => {
  try {
    const reviews = await reviewModel.getAll();
    return api.success(res, reviews);
  } catch (error) {
    console.error("❌ getAllReview error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET REVIEW BY ID
============================================================ */
const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await reviewModel.getById(id);
    if (!review) return api.error(res, "Review not found", 404);
    return api.success(res, review);
  } catch (error) {
    console.error("❌ getReviewById error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE REVIEW (Cloudinary)
============================================================ */
const createReview = async (req, res) => {
  try {
    const { name, feedback, tenant } = req.body;
    const file = req.file;

    let fileIMG = file.path;

    const review = {
      name,
      feedback,
      tenant,
      fileIMG,
    };

    const result = await reviewModel.insert(review);
    emit("review:create", result);

    return api.success(res, result, "Review created successfully");
  } catch (error) {
    console.error("❌ createReview error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE REVIEW (Cloudinary)
============================================================ */
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { name, feedback, tenant } = req.body;
  const file = req.file;

  try {
    const oldReview = await reviewModel.getById(id);
    if (!oldReview) return api.error(res, "Review not found", 404);

    const updateData = {
      name: name || oldReview.name,
      feedback: feedback || oldReview.feedback,
      tenant: tenant || oldReview.tenant,
      fileIMG: oldReview.fileIMG,
    };

    if (file && file.path) {
      // Hapus gambar lama di Cloudinary jika ada
      if (oldReview.fileIMG) {
        try {
          const publicId = cloud.getPublicId(oldReview.fileIMG);
          await cloud.deleteFile(publicId);
        } catch (deleteErr) {
          console.warn(
            "⚠️ Failed to delete old Cloudinary image:",
            deleteErr.message
          );
        }
      }

      // Upload gambar baru
      try {
        const uploadRes = await cloud.uploadFile(file.path, "review");
        updateData.fileIMG = uploadRes.secure_url;
      } catch (err) {
        console.error("⚠️ Cloudinary upload failed:", err.message);
        return api.error(res, "Failed to upload new image", 400);
      }
    }

    const result = await reviewModel.update(id, updateData);
    emit("review:update", { id, ...updateData });

    return api.success(res, result, "Review updated successfully");
  } catch (error) {
    console.error("❌ updateReview error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE REVIEW (Cloudinary)
============================================================ */
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await reviewModel.getById(id);
    if (!review) return api.error(res, "Review not found", 404);

    if (review.fileIMG) {
      try {
        const publicId = cloud.getPublicId(review.fileIMG);
        await cloud.deleteFile(publicId);
      } catch (deleteErr) {
        console.warn("⚠️ Failed to delete image:", deleteErr.message);
      }
    }

    await reviewModel.deleted(id);
    emit("review:delete", { id });

    return api.success(res, {}, "Review deleted successfully");
  } catch (error) {
    console.error("❌ deleteReview error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllReview,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
