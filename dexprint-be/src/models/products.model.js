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

const getByCategories = async () => {
  const products = await db
    .select("p.*", "c.categoryName")
    .from("products as p")
    .join("categories as c", "c.categoryId", "p.categoryId");

  // Ambil images dan videos
  for (const product of products) {
    product.images = await db("product_img")
      .select("imgId", "url", "note", "isThumbnail")
      .where({ productId: product.productId });

    product.videos = await db("product_videos")
      .select("videoId", "videoUrl", "videoNote")
      .where({ productId: product.productId });
  }

  // Grouping hasil berdasarkan categoryName
  const grouped = products.reduce((acc, product) => {
    const category = product.categoryName;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);
    return acc;
  }, {});

  // Ubah ke format array of objects
  return Object.entries(grouped).map(([categoryName, products]) => ({
    categoryName,
    products,
  }));
};
const getByproductId = async (id) => {
  const product = await db("products as p")
    .leftJoin("categories as c", "p.categoryId", "c.categoryId")
    .select(
      "p.productId",
      "p.productName",
      "p.categoryId",
      "c.categoryName",
      "p.description",
      "p.minprice",
      "p.isThumbnail"
    )
    .where("p.productId", id)
    .first();

  if (!product) return null;

  // Ambil images
  const images = await db("product_img")
    .where({ productId: id })
    .select("url", "isThumbnail", "imgId", "note");

  // Ambil videos
  const videos = await db("product_videos")
    .where({ productId: id })
    .select("videoUrl", "videoId");

  return {
    ...product,
    images,
    videos,
  };
};

const insert = async (data, files) => {
  return await db.transaction(async (trx) => {
    // Insert Product
    const [productId] = await trx("products").insert({
      productName: data.productName,
      categoryId: data.categoryId,
      description: data.description,
      minprice: data.minprice,
      isThumbnail: data.isThumbnail === "true" ? 1 : 0,
    });

    // Insert Images (jika ada)
    if (files && files.length > 0) {
      const imgData = files.map((file) => ({
        productId,
        url: file.path,
        note: data.productName,
      }));
      await trx("product_img").insert(imgData);
    }

    // Insert Video (jika ada)
    if (data.videoUrl) {
      await trx("product_videos").insert({
        productId,
        videoUrl: data.videoUrl,
      });
    }

    return { productId };
  });
};

const update = async (productId, data, files = []) => {
  return await db.transaction(async (trx) => {
    // 1️⃣ Update data utama produk
    await trx("products")
      .where({ productId })
      .update({
        productName: data?.productName,
        categoryId: data?.categoryId,
        description: data?.description,
        minprice: data?.minprice,
        isThumbnail: data?.isThumbnail === "true" ? 1 : 0,
      });

    if (files && files.length > 0) {
      const imgData = files.map((file) => ({
        productId,
        url: file.path,
        note: data.productName,
      }));
      await trx("product_img").insert(imgData);
    }

    if (data.videoUrl) {
      await trx("product_videos").where({ productId }).del();

      // Insert video baru
      await trx("product_videos").insert({
        productId,
        videoUrl: data.videoUrl,
        videoNote: data.videoNote || null,
      });
    }

    return { productId };
  });
};

const deleted = async (productId) => db("products").where({ productId }).del();

// ======================
// PRODUCT IMAGES
// ======================
const getProductImages = async (productId) =>
  await db("product_img").select("*").where({ productId });

const getImgById = async (imgId) => await db("product_img").select("*");

const addImage = async (data) => await db("product_img").insert(data);

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
  getImgById,
  addImage,
  deleteImage,
  setThumbnail,
  getVideos,
  addVideo,
  deleteVideo,
  getProductImages,
  getByCategories,
};
