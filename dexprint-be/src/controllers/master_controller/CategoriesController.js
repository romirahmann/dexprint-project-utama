const categoryModel = require("../../models/categories.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");

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

    if (!categoryName) return api.error(res, "Category name is required", 400);

    const result = await categoryModel.insert({ categoryName });

    // 🔔 Emit ke semua client
    emit("category:create", result);

    return api.success(res, result);
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

  try {
    const existing = await categoryModel.getById(id);
    if (!existing) return api.error(res, "Category not found", 404);

    const updateData = {
      categoryName: categoryName || existing.categoryName,
    };

    const result = await categoryModel.update(id, updateData);

    emit("category:update", { id, ...updateData });

    return api.success(res, result);
  } catch (error) {
    console.error(error);
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

    await categoryModel.deleted(id);

    emit("category:delete", { id });

    return api.success(res, {});
  } catch (error) {
    console.error(error);
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
