const db = require("../database/db.config");

// Ambil semua review
const getAll = async () => db.select("*").from("reviews");

// Ambil satu review berdasarkan ID
const getById = async (reviewId) => db("reviews").where({ reviewId }).first();

// Tambah review baru
const insert = async (data) => db("reviews").insert(data);

// Update review berdasarkan ID
const update = async (reviewId, data) =>
  db("reviews").where({ reviewId }).update(data);

// Hapus review berdasarkan ID
const deleted = async (reviewId) => db("reviews").where({ reviewId }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
};
