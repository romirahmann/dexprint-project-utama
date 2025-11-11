const db = require("../database/db.config");

// === PORTOFOLIO ===

// Get all portfolios + images
const getAll = async () => {
  const portfolios = await db("portofolio as p")
    .select("p.*", "pr.productName")
    .join("products as pr", "pr.productId", "p.productId");

  for (const porto of portfolios) {
    porto.images = await db("portofolio_img")
      .select("imgId", "url", "note")
      .where({ portofolioId: porto.portoId });
  }

  return portfolios;
};

// Get by ID
const getById = async (portoId) => {
  const porto = await db("portofolio as p")
    .select("p.*", "pr.productName")
    .join("products as pr", "pr.productId", "p.productId")
    .where({ portoId })
    .first();

  if (!porto) return null;

  porto.images = await db("portofolio_img")
    .select("imgId", "url", "note")
    .where({ portofolioId: porto.portoId });

  return porto;
};

// Insert portfolio
const insert = async (data) => db("portofolio").insert(data);

// Update portfolio
const update = async (portoId, data) =>
  db("portofolio").where({ portoId }).update(data);

// Delete portfolio
const deleted = async (portoId) => db("portofolio").where({ portoId }).del();

// === PORTOFOLIO IMAGE ===

// Add image
const addImage = async (portofolioId, url, note = null) =>
  db("portofolio_img").insert({ url, note, portofolioId });

// Delete image
const deleteImage = async (imgId) =>
  db("portofolio_img").where({ imgId }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
  addImage,
  deleteImage,
};
