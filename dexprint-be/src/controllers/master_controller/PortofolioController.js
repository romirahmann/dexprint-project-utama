const portfolioModel = require("../../models/portofolio.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");
const cloud = require("../../helper/cloudinary");

/* === PORTOFOLIO CRUD === */
const getAllPortfolio = async (req, res) => {
  try {
    const data = await portfolioModel.getAll();
    console.log(data);
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
    const data = req.body;
    const files = req.files;

    if (!data) return api.error(res, "Data is required!", 400);

    console.log(data, files);

    const result = await portfolioModel.insert(data, files);
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

    const images = await portfolioModel.getPortfolioImages(id);

    if (images.length) {
      for (const img of images) {
        const publicId = cloud.getPublicId(img.url);
        await cloud.deleteFile(publicId);
      }
    }

    await portfolioModel.deleted(id);

    emit("portfolio:delete", { id });

    return api.success(res, "Portfolio deleted successfully");
  } catch (error) {
    console.error("❌ deletePortfolio error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* === PORTOFOLIO IMAGE === */
const addPortfolioImage = async (req, res) => {
  const { portofolioId } = req.params;
  const files = req.files; // array of uploaded files

  try {
    if (!files || !files.length) {
      return api.error(res, "Image files are required", 400);
    }

    const portfolio = await portfolioModel.getById(portofolioId);
    if (!portfolio) {
      return api.error(res, "Portfolio not found", 404);
    }

    const insertedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const result = await portfolioModel.addImage(
        portofolioId,
        file.path,
        file.originalname
      );

      insertedImages.push(result);
    }

    emit("portfolio:image:add", "Successfully");

    return api.success(res, insertedImages, "Images added successfully");
  } catch (error) {
    console.error("❌ addPortfolioImage error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

const deletePortfolioImage = async (req, res) => {
  const { imgId } = req.params;
  try {
    let img = await portfolioModel.getImages(imgId);

    if (img) {
      const publicId = cloud.getPublicId(img.url);
      await cloud.deleteFile(publicId);
    }

    await portfolioModel.deleteImage(imgId);
    emit("portfolio:image:delete", { img });
    return api.success(res, "SuccessFully");
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
