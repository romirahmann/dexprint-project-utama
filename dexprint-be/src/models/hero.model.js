const db = require("../database/db.config");

// === GET All Hero Banners ===
const getAll = async () => db.select("*").from("hero_banner");

// === GET by ID ===
const getById = async (bannerId) =>
  db("hero_banner").where({ bannerId }).first();

// === INSERT ===
const insert = async (data) => db("hero_banner").insert(data);

// === UPDATE ===
const update = async (bannerId, data) =>
  db("hero_banner").where({ bannerId }).update(data);

// === DELETE ===
const deleted = async (bannerId) => db("hero_banner").where({ bannerId }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
};
