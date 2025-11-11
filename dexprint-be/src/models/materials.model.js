const db = require("../database/db.config");

const getAll = async () => {
  return db("materials as m")
    .select("m.*", "p.productName")
    .leftJoin("products as p", "p.productId", "m.productId");
};

const getById = async (materialId) =>
  db("materials").where({ materialId }).first();

const insert = async (data) => db("materials").insert(data);

const update = async (materialId, data) =>
  db("materials").where({ materialId }).update(data);

const deleted = async (materialId) =>
  db("materials").where({ materialId }).del();

module.exports = { getAll, getById, insert, update, deleted };
