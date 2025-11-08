const heroModel = require("../../models/hero.model");
const api = require("../../helper/common");
const cloud = require("../../helper/cloudinary");

const { emit } = require("../../services/socket.service"); // 🔌 Socket IO

// GET ALL HERO BANNERS
const getAllHero = async (req, res) => {
  try {
    const banners = await heroModel.getAll();
    return api.success(res, banners);
  } catch (error) {
    console.error("❌ Error getAllHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// GET HERO BANNER BY ID
const getHeroById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await heroModel.getById(id);
    if (!banner) return api.error(res, "Hero banner not found", 404);
    return api.success(res, banner);
  } catch (error) {
    console.error("❌ Error getHeroById:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// CREATE HERO BANNER
const createHero = async (req, res) => {
  const { type } = req.body;
  const files = req.files;

  try {
    files.forEach(async (file) => {
      await heroModel.insert({
        note: file.originalname,
        file: file.path,
        type,
      });
    });

    emit("hero:create", "Success");

    return api.success(res, "Upload Successfully!");
  } catch (error) {
    console.error("❌ Error createHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// UPDATE HERO BANNER
const updateHero = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  try {
    const oldHero = await heroModel.getById(id);
    if (!oldHero) return api.error(res, "Hero banner not found", 404);

    // Data default pakai nilai lama dulu
    const updateData = {
      note: data.note || oldHero.note,
      type: data.type || oldHero.type,
      file: oldHero.file,
    };

    // Kalau ada file baru diupload
    if (file && file.path) {
      // Hapus file lama dari Cloudinary (kalau ada)
      if (oldHero.file) {
        try {
          const publicId = cloud.getPublicId(oldHero.file);
          await cloud.deleteFile(publicId);
          console.log(`🗑️ Deleted old hero image from Cloudinary: ${publicId}`);
        } catch (deleteErr) {
          console.warn(
            "⚠️ Failed to delete old Cloudinary image:",
            deleteErr.message
          );
        }
      }

      // Simpan file baru dari Cloudinary
      updateData.file = file.path;
    }

    const result = await heroModel.update(id, updateData);

    // Emit ke semua client untuk sinkron UI real-time
    emit("hero:update", { id, ...updateData });

    return api.success(res, result, "Hero updated successfully");
  } catch (error) {
    console.error("❌ Error updateHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// DELETE HERO BANNER
const deleteHero = async (req, res) => {
  const { id } = req.params;

  try {
    const banner = await heroModel.getById(id);
    if (!banner) return api.error(res, "Hero banner not found", 404);

    // Hapus file image jika ada
    if (banner.file) {
      try {
        const publicId = cloud.getPublicId(banner.file);
        await cloud.deleteFile(publicId);
      } catch (deleteErr) {
        console.warn(
          "⚠️ Failed to delete old Cloudinary file:",
          deleteErr.message
        );
        return api.error(res, "Failed to delete image from Cloudinary", 400);
      }
    }

    const result = await heroModel.deleted(id);

    emit("hero:delete", { id });

    return api.success(res, result);
  } catch (error) {
    console.error("❌ Error deleteHero:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllHero,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
