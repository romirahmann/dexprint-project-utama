const productModel = require("../../models/products.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");
const cloud = require("../../helper/cloudinary");

/* ========================== GET ALL PRODUCTS ========================== */
const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.getAll();
    return api.success(res, products);
  } catch (error) {
    console.error("❌ getAllProduct error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== GET PRODUCT BY ID ========================== */
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getByproductId(id);
    if (!product) return api.error(res, "Product not found", 404);
    return api.success(res, product);
  } catch (error) {
    console.error("❌ getProductById error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== CREATE PRODUCT ========================== */
const createProduct = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return api.error(res, "Data is require!", 400);

    const result = await productModel.insert(data);

    emit("product:create", result);
    return api.success(res, result);
  } catch (error) {
    console.error("❌ createProduct error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== UPDATE PRODUCT ========================== */
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const existing = await productModel.getByproductId(id);
    if (!existing) return api.error(res, "Product not found", 404);

    const result = await productModel.update(id, data);
    emit("product:update", "Update Successfully");

    return api.success(res, result);
  } catch (error) {
    console.error("❌ updateProduct error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== DELETE PRODUCT ========================== */
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await productModel.getByproductId(id);
    if (!existing) return api.error(res, "Product not found", 404);

    await productModel.deleted(id);
    emit("product:delete", { id });

    return api.success(res, "Product deleted successfully");
  } catch (error) {
    console.error("❌ deleteProduct error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== ADD PRODUCT IMAGE ========================== */
const addProductImages = async (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  const files = req.files;

  try {
    if (!files || files.length === 0)
      return api.error(res, "Image files are required", 400);

    const product = await productModel.getByproductId(id);
    if (!product) return api.error(res, "Product not found", 404);

    // Loop upload semua gambar
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isThumbnail = i === 0;

      await productModel.addImage(
        id,
        file.path,
        note || file.originalname,
        isThumbnail
      );
    }

    emit("product:image:add", { productId: id });
    return api.success(res, {}, "Images added successfully");
  } catch (error) {
    console.error("❌ addProductImage error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== DELETE PRODUCT IMAGE ========================== */
const deleteProductImage = async (req, res) => {
  const { imgId } = req.params;

  try {
    const image = await db("product_img").where({ imgId }).first();
    if (!image) return api.error(res, "Image not found", 404);

    if (image.url) {
      try {
        const publicId = cloud.getPublicId(image.url);
        await cloud.deleteFile(publicId);
      } catch (err) {
        console.warn("⚠️ Cloudinary delete failed:", err.message);
      }
    }

    await productModel.deleteImage(imgId);
    emit("product:image:delete", { imgId });

    return api.success(res, {}, "Image deleted successfully");
  } catch (error) {
    console.error("❌ deleteProductImage error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ========================== SET PRODUCT THUMBNAIL ========================== */
const setProductThumbnail = async (req, res) => {
  const { id, imgId } = req.params;

  try {
    await productModel.setThumbnail(id, imgId);
    emit("product:thumbnail:update", { productId: id, imgId });
    return api.success(res, {}, "Thumbnail updated successfully");
  } catch (error) {
    console.error("❌ setProductThumbnail error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImages,
  deleteProductImage,
  setProductThumbnail,
};
