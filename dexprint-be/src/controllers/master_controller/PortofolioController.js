const portfolioModel = require("../../models/portofolio.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");

/* === PORTOFOLIO CRUD === */
const getAllPortfolio = async (req, res) => {
  try {
    const data = await portfolioModel.getAll();
    return api.success(res, data);
  } catch (error) {
    console.error("❌ getAllPortfolio error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const getPortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await portfolioModel.getById(id);
    if (!data) return api.error(res, "Portfolio not found", 404);
    return api.success(res, data);
  } catch (error) {
    console.error("❌ getPortfolioById error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const createPortfolio = async (req, res) => {
  try {
    const { portoName, portoDesc, productId } = req.body;
    if (!portoName || !productId)
      return api.error(res, "portoName and productId are required", 400);

    const result = await portfolioModel.insert({
      portoName,
      portoDesc,
      productId,
    });
    emit("portfolio:create", result);
    return api.success(res, result, "Portfolio created successfully");
  } catch (error) {
    console.error("❌ createPortfolio error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await portfolioModel.getById(id);
    if (!existing) return api.error(res, "Portfolio not found", 404);

    const data = req.body;

    const result = await portfolioModel.update(id, data);
    emit("portfolio:update", { id });
    return api.success(res, result);
  } catch (error) {
    console.error("❌ updatePortfolio error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await portfolioModel.getById(id);
    if (!existing) return api.error(res, "Portfolio not found", 404);

    await portfolioModel.deleted(id);
    emit("portfolio:delete", { id });
    return api.success(res, {}, "Portfolio deleted successfully");
  } catch (error) {
    console.error("❌ deletePortfolio error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* === PORTOFOLIO IMAGE === */
const addPortfolioImage = async (req, res) => {
  const { id } = req.params; // portoId
  const { note } = req.body;
  const file = req.file;

  try {
    if (!file) return api.error(res, "Image file is required", 400);

    const portfolio = await portfolioModel.getById(id);
    if (!portfolio) return api.error(res, "Portfolio not found", 404);

    const result = await portfolioModel.addImage(id, file.path, note);
    emit("portfolio:image:add", { portfolioId: id, image: file.path });

    return api.success(res, result, "Image added successfully");
  } catch (error) {
    console.error("❌ addPortfolioImage error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const deletePortfolioImage = async (req, res) => {
  const { imgId } = req.params;

  try {
    await portfolioModel.deleteImage(imgId);
    emit("portfolio:image:delete", { imgId });
    return api.success(res, {}, "Image deleted successfully");
  } catch (error) {
    console.error("❌ deletePortfolioImage error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  addPortfolioImage,
  deletePortfolioImage,
};
