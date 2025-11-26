const bannerModel = require("../../models/banner.model");
const api = require("../../helper/common");
const cloud = require("../../helper/cloudinary");
const { emit } = require("../../services/socket.service"); // 🔌 Socket IO

// === GET ALL BANNERS (FULL DATA) ===
const getAllBanner = async (req, res) => {
  const { page } = req.query;
  console.log(page);
  try {
    const banners = await bannerModel.getAll(page);
    return api.success(res, banners);
  } catch (error) {
    console.error("❌ Error getAllBanner:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// === GET BANNERS GROUPED BY PAGE (CUSTOM FORMAT) ===
const getGroupedBanner = async (req, res) => {
  try {
    const data = await bannerModel.getGroupedBanners();
    return api.success(res, data);
  } catch (error) {
    console.error("❌ Error getGroupedBanner:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// === GET BANNER BY ID ===
const getBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await bannerModel.getById(id);
    if (!banner) return api.error(res, "Banner not found", 404);
    return api.success(res, banner);
  } catch (error) {
    console.error("❌ Error getBannerById:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// === CREATE BANNER ===
const createBanner = async (req, res) => {
  const { page } = req.body;
  const file = req.file;

  try {
    if (!file) return api.error(res, "No image uploaded", 400);
    console.log(page, file);
    const newBanner = {
      page,
      title: file.originalname,
      imageUrl: file.path,
    };

    await bannerModel.insert(newBanner);

    emit("banner:create", newBanner);

    return api.success(res, newBanner, "Banner created successfully");
  } catch (error) {
    console.error("❌ Error createBanner:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// === UPDATE BANNER ===
const updateBanner = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  try {
    const oldBanner = await bannerModel.getById(id);
    if (!oldBanner) return api.error(res, "Banner not found", 404);

    const updateData = {
      page: data.page || oldBanner.page,
      title: data.title || oldBanner.title,
      subtitle: data.subtitle || oldBanner.subtitle,
      description: data.description || oldBanner.description,
      orderIndex: data.orderIndex || oldBanner.orderIndex,
      isActive: data.isActive ?? oldBanner.isActive,
      imageUrl: oldBanner.imageUrl,
      updatedAt: new Date(),
    };

    // Kalau ada file baru → hapus file lama dari Cloudinary
    if (file && file.path) {
      if (oldBanner.imageUrl) {
        try {
          const publicId = cloud.getPublicId(oldBanner.imageUrl);
          await cloud.deleteFile(publicId);
          console.log(`🗑️ Deleted old banner image: ${publicId}`);
        } catch (err) {
          console.warn("⚠️ Cloudinary delete failed:", err.message);
        }
      }
      updateData.imageUrl = file.path;
    }

    await bannerModel.update(id, updateData);

    emit("banner:update", { id, ...updateData });

    return api.success(res, updateData, "Banner updated successfully");
  } catch (error) {
    console.error("❌ Error updateBanner:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// === DELETE BANNER ===
const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await bannerModel.getById(id);
    if (!banner) return api.error(res, "Banner not found", 404);

    // Hapus dari Cloudinary jika ada
    if (banner.imageUrl) {
      try {
        const publicId = cloud.getPublicId(banner.imageUrl);
        await cloud.deleteFile(publicId);
      } catch (error) {
        console.warn("⚠️ Failed to delete Cloudinary file:", error.message);
      }
    }

    await bannerModel.deleted(id);

    emit("banner:delete", { id });

    return api.success(res, "Banner deleted successfully");
  } catch (error) {
    console.error("❌ Error deleteBanner:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllBanner,
  getGroupedBanner,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
