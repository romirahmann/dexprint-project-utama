const db = require("../database/db.config");

// === GET All Banners ===
const getAll = async (page) => db.select("*").from("banners").where({ page });

// === GET by ID ===
const getById = async (bannerId) => db("banners").where({ bannerId }).first();

// === GET by Page (products, portfolios, contact, etc) ===
const getByPage = async (page) =>
  db("banners").where({ page, isActive: 1 }).orderBy("orderIndex", "asc");

// === GET Grouped Output (exact format you requested) ===
const getGroupedBanners = async () => {
  const pages = ["products", "portfolios", "contact"];
  const result = {};

  for (const page of pages) {
    const banners = await db("banners")
      .select("bannerId", "page", "imageUrl as file", "title", "description")
      .where({ page })
      .orderBy("orderIndex", "asc");

    result[page] = banners;
  }

  return result;
};

// === INSERT ===
const insert = async (data) => db("banners").insert(data);

// === UPDATE ===
const update = async (bannerId, data) =>
  db("banners").where({ bannerId }).update(data);

// === DELETE ===
const deleted = async (bannerId) => db("banners").where({ bannerId }).del();

module.exports = {
  getAll,
  getById,
  getByPage,
  getGroupedBanners,
  insert,
  update,
  deleted,
};
