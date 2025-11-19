const categoryModel = require("../../models/categories.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");
const cloud = require("../../helper/cloudinary"); // optional, jika pakai cloudinary

/* ============================================================
   ✅ GET ALL CATEGORIES
============================================================ */
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.getAll();
    return api.success(res, categories);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET CATEGORY BY ID
============================================================ */
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.getById(id);
    if (!category) return api.error(res, "Category not found", 404);
    return api.success(res, category);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE CATEGORY
============================================================ */
const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const file = req.file; // multer middleware

    if (!categoryName) return api.error(res, "Category name is required", 400);

    const categoryData = {
      categoryName,
      img: file ? file.path : null,
    };

    const result = await categoryModel.insert(categoryData);

    emit("category:create", result);

    return api.success(res, result, "Category created successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE CATEGORY
============================================================ */
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const file = req.file;

  try {
    const existing = await categoryModel.getById(id);
    if (!existing) return api.error(res, "Category not found", 404);

    const updateData = {
      categoryName: categoryName || existing.categoryName,
      img: existing.img,
    };

    // jika ada file baru
    if (file && file.path) {
      // hapus file lama jika ada (cloudinary)
      if (existing.img) {
        try {
          const publicId = cloud.getPublicId(existing.img);
          await cloud.deleteFile(publicId);
        } catch (deleteErr) {
          console.warn(
            "⚠️ Failed to delete old category image:",
            deleteErr.message
          );
        }
      }
      updateData.img = file.path;
    }

    const result = await categoryModel.update(id, updateData);

    emit("category:update", { id, ...updateData });

    return api.success(res, result, "Category updated successfully");
  } catch (error) {
    console.error("❌ updateCategory error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE CATEGORY
============================================================ */
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await categoryModel.getById(id);
    if (!existing) return api.error(res, "Category not found", 404);

    // hapus file img jika ada
    if (existing.img) {
      try {
        const publicId = cloud.getPublicId(existing.img);
        await cloud.deleteFile(publicId);
      } catch (deleteErr) {
        console.warn("⚠️ Failed to delete category image:", deleteErr.message);
      }
    }

    await categoryModel.deleted(id);

    emit("category:delete", { id });

    return api.success(res, {}, "Category deleted successfully");
  } catch (error) {
    console.error("❌ deleteCategory error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
