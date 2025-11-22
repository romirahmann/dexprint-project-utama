const db = require("../database/db.config");

// Ambil semua images (opsional bisa filter productId)
const getAllImages = async (productId = null) => {
  let query = db("product_img").select(
    "imgId",
    "url",
    "note",
    "productId",
    "isThumbnail"
  );
  if (productId) query = query.where({ productId });
  return query;
};

// Ambil 1 image berdasarkan imgId
const getImageById = async (imgId) => {
  return db("product_img")
    .select("imgId", "url", "note", "productId", "isThumbnail")
    .where({ imgId })
    .first();
};

// Tambah image
const addImage = async (productId, url, note = null, isThumbnail = false) => {
  return await db.transaction(async (trx) => {
    if (isThumbnail) {
      await trx("product_img")
        .where({ productId })
        .update({ isThumbnail: false });
    }

    const [imgId] = await trx("product_img").insert({
      productId,
      url,
      note,
      isThumbnail,
    });

    return imgId;
  });
};

// Tambah banyak image sekaligus
const addImagesBulk = async (productId, images = []) => {
  return await db.transaction(async (trx) => {
    const insertData = images.map((img) => ({
      productId,
      url: img.url,
      note: img.note || null,
      isThumbnail: img.isThumbnail || false,
    }));

    return trx("product_img").insert(insertData);
  });
};

// Update image
const updateImage = async (imgId, data) => {
  return db("product_img").where({ imgId }).update({
    url: data.url,
    note: data.note,
    isThumbnail: data.isThumbnail,
  });
};

// Delete image
const deleteImage = async (imgId) => {
  return db("product_img").where({ imgId }).del();
};

// Set image sebagai thumbnail
const setThumbnail = async (productId, imgId) => {
  return await db.transaction(async (trx) => {
    await trx("product_img")
      .where({ productId })
      .update({ isThumbnail: false });
    await trx("product_img").where({ imgId }).update({ isThumbnail: true });
  });
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
