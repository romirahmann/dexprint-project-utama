const db = require("../database/db.config");

// === GET All Categories ===
const getAll = async () => db.select("*").from("categories");

// === GET by ID ===
const getById = async (categoryId) =>
  db("categories").where({ categoryId }).first();

// === INSERT ===
const insert = async (data) => db("categories").insert(data);

// === UPDATE ===
const update = async (categoryId, data) =>
  db("categories").where({ categoryId }).update(data);

// === DELETE ===
const deleted = async (categoryId) =>
  db("categories").where({ categoryId }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
};
