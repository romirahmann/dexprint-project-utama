const productImgModel = require("../../models/proudctImg");
const api = require("../../helper/common");

// ======================
// GET ALL IMAGES
// ======================
const getAllImages = async (req, res) => {
  try {
    const productId = req.query.productId; // optional
    const images = await productImgModel.getAllImages(productId);
    return api.success(res, images);
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to fetch images");
  }
};

// ======================
// GET IMAGE BY ID
// ======================
const getImageById = async (req, res) => {
  try {
    const imgId = req.params.imgId;
    const image = await productImgModel.getImageById(imgId);
    if (!image) return api.error(res, "Image not found", 404);
    return api.success(res, image);
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to fetch image");
  }
};

// ======================
// ADD SINGLE IMAGE
// ======================
const addImage = async (req, res) => {
  try {
    const { productId, note, isThumbnail } = req.body;
    const file = req.file; // jika pakai multer single upload

    if (!file) return api.error(res, "No image uploaded");

    const imgId = await productImgModel.addImage(
      productId,
      file.path,
      note,
      isThumbnail === "true" || isThumbnail === true
    );

    const image = await productImgModel.getImageById(imgId);
    return api.success(res, image, "Image added successfully!");
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to add image");
  }
};

// ======================
// ADD MULTIPLE IMAGES
// ======================
const addImagesBulk = async (req, res) => {
  try {
    const { productId } = req.body;
    const files = req.files; // jika pakai multer multiple upload

    if (!files || files.length === 0)
      return api.error(res, "No images uploaded");

    const imagesData = files.map((file) => ({
      url: file.path,
      note: null,
      isThumbnail: false,
    }));

    await productImgModel.addImagesBulk(productId, imagesData);

    const images = await productImgModel.getAllImages(productId);
    return api.success(res, images, "Images added successfully!");
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to add images");
  }
};

// ======================
// UPDATE IMAGE
// ======================
const updateImage = async (req, res) => {
  try {
    const imgId = req.params.imgId;
    const { url, note, isThumbnail } = req.body;

    const image = await productImgModel.getImageById(imgId);
    if (!image) return api.error(res, "Image not found", 404);

    await productImgModel.updateImage(imgId, { url, note, isThumbnail });

    if (isThumbnail) {
      await productImgModel.setThumbnail(image.productId, imgId);
    }

    const updated = await productImgModel.getImageById(imgId);
    return api.success(res, updated, "Image updated successfully!");
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to update image");
  }
};

// ======================
// DELETE IMAGE
// ======================
const deleteImage = async (req, res) => {
  try {
    const imgId = req.params.imgId;
    const image = await productImgModel.getImageById(imgId);
    if (!image) return api.error(res, "Image not found", 404);

    await productImgModel.deleteImage(imgId);
    return api.success(res, null, "Image deleted successfully!");
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to delete image");
  }
};

// ======================
// SET THUMBNAIL
// ======================
const setThumbnail = async (req, res) => {
  try {
    const { productId, imgId } = req.body;

    await productImgModel.setThumbnail(productId, imgId);
    const image = await productImgModel.getImageById(imgId);
    return api.success(res, image, "Thumbnail set successfully!");
  } catch (error) {
    console.error(error);
    return api.error(res, "Failed to set thumbnail");
  }
};

// ======================
// EXPORT
// ======================
module.exports = {
  getAllImages,
  getImageById,
  addImage,
  addImagesBulk,
  updateImage,
  deleteImage,
  setThumbnail,
};
