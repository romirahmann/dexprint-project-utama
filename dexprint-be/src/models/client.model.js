const db = require("../database/db.config");

const getAll = async () => db.select("*").from("clients");
const getById = async (clientId) => db("clients").where({ clientId }).first();
const insert = async (data) => db("clients").insert(data);
const update = async (clientId, data) =>
  db("clients").where({ clientId }).update(data);
const deleted = async (clientId) => db("clients").where({ clientId }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
};
