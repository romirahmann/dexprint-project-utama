const db = require("../database/db.config");

// === PORTOFOLIO ===

// Get all portfolios + images
const getAll = async () => {
  const portfolios = await db("portofolio as p")
    .select("p.*", "pr.productName", "c.categoryName")
    .join("products as pr", "pr.productId", "p.productId")
    .leftJoin("categories as c", "pr.categoryId", "c.categoryId");

  for (const porto of portfolios) {
    porto.images = await db("portofolio_img")
      .select("id", "url", "note")
      .where({ portofolioId: porto.portofolioId });
  }

  return portfolios;
};

// Get by ID
const getById = async (portofolioId) => {
  const porto = await db("portofolio as p")
    .select("p.*", "pr.productName", "c.categoryName")
    .join("products as pr", "pr.productId", "p.productId")
    .leftJoin("categories as c", "pr.categoryId", "c.categoryId")
    .where({ portofolioId })
    .first();

  if (!porto) return null;

  porto.images = await db("portofolio_img")
    .select("id", "url", "note")
    .where({ portofolioId: porto.portofolioId });

  return porto;
};

const insert = async (data, files) => {
  return await db.transaction(async (trx) => {
    const [portofolioId] = await trx("portofolio").insert({
      portoName: data.portoName,
      portoDesc: data.portoDesc,
      productId: data.productId,
      doDate: data.doDate,
      client: data.client,
    });

    if (files && files.length > 0) {
      const imgData = files.map((file) => ({
        portofolioId,
        url: file.path,
        note: data.portoName || null,
        portofolioId: data.portofolioId,
      }));

      await trx("portofolio_img").insert(imgData);
    }

    return { portofolioId };
  });
};

// Update portfolio
const update = async (portoId, data) =>
  db("portofolio").where({ portoId }).update(data);

// Delete portfolio
const deleted = async (portoId) => db("portofolio").where({ portoId }).del();

// === PORTOFOLIO IMAGE ===

const getImages = async (id) => db("portofolio_img").where({ id }).first();

// Add image
const addImage = async (portofolioId, url, note = null) =>
  db("portofolio_img").insert({ url, note, portofolioId });

// Delete image
const deleteImage = async (id) => db("portofolio_img").where({ id }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
  addImage,
  deleteImage,
  getImages,
};
