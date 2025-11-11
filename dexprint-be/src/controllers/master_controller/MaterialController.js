const materialModel = require("../../models/materials.model");
const api = require("../../helper/common");

const getAllMaterial = async (req, res) => {
  try {
    const data = await materialModel.getAll();
    return api.success(res, data);
  } catch (error) {
    console.error("getAllMaterial:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await materialModel.getById(id);
    if (!data) return api.error(res, "Material not found", 404);
    return api.success(res, data);
  } catch (error) {
    console.error("getMaterialById:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const createMaterial = async (req, res) => {
  try {
    const { materialName, size, unit, price, productId } = req.body;
    if (!materialName) return api.error(res, "Material name is required", 400);

    const result = await materialModel.insert({
      materialName,
      size,
      unit,
      price,
      productId,
    });

    return api.success(res, result, "Material created successfully");
  } catch (error) {
    console.error("createMaterial:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await materialModel.getById(id);
    if (!data) return api.error(res, "Material not found", 404);

    await materialModel.update(id, req.body);
    return api.success(res, null, "Material updated successfully");
  } catch (error) {
    console.error("updateMaterial:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await materialModel.getById(id);
    if (!data) return api.error(res, "Material not found", 404);

    await materialModel.deleted(id);
    return api.success(res, null, "Material deleted successfully");
  } catch (error) {
    console.error("deleteMaterial:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllMaterial,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
