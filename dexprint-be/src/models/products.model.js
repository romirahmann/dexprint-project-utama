const db = require("../database/db.config");

// ======================
// PRODUCTS
// ======================
const getAll = async () => {
  const products = await db
    .select("p.*", "c.categoryName")
    .from("products as p")
    .join("categories as c", "c.categoryId", "p.categoryId");

  for (const product of products) {
    product.images = await db("product_img")
      .select("imgId", "url", "note", "isThumbnail")
      .where({ productId: product.productId });

    product.videos = await db("product_videos")
      .select("videoId", "videoUrl", "videoNote")
      .where({ productId: product.productId });
  }

  return products;
};

const getByproductId = async (productId) => {
  const product = await db
    .select("p.*", "c.categoryName")
    .from("products as p")
    .join("categories as c", "c.categoryId", "p.categoryId")
    .where({ productId })
    .first();

  if (!product) return null;

  product.images = await db("product_img")
    .select("imgId", "url", "note", "isThumbnail")
    .where({ productId });

  product.videos = await db("product_videos")
    .select("videoId", "videoUrl", "videoNote")
    .where({ productId });

  return product;
};

const insert = async (data) => db("products").insert(data);
const update = async (productId, data) =>
  db("products").where({ productId }).update(data);
const deleted = async (productId) => db("products").where({ productId }).del();

// ======================
// PRODUCT IMAGES
// ======================
const addImage = async (productId, url, note = null, isThumbnail = false) => {
  if (isThumbnail)
    await db("product_img").where({ productId }).update({ isThumbnail: false });

  return db("product_img").insert({ url, note, productId, isThumbnail });
};

const deleteImage = async (imgId) => db("product_img").where({ imgId }).del();

const setThumbnail = async (productId, imgId) => {
  await db("product_img").where({ productId }).update({ isThumbnail: false });
  await db("product_img").where({ imgId }).update({ isThumbnail: true });
};

// ======================
// PRODUCT VIDEOS
// ======================
const getVideos = async (productId) =>
  db("product_videos").where({ productId });

const addVideo = async (productId, videoUrl, videoNote = null) =>
  db("product_videos").insert({ productId, videoUrl, videoNote });

const deleteVideo = async (videoId) =>
  db("product_videos").where({ videoId }).del();

// ======================
// EXPORT
// ======================
module.exports = {
  getAll,
  getByproductId,
  insert,
  update,
  deleted,
  addImage,
  deleteImage,
  setThumbnail,
  getVideos,
  addVideo,
  deleteVideo,
};
