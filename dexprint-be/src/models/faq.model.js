const db = require("../database/db.config");

const getAll = async () => db.select("*").from("faq");

const getById = async (id) => db("faq").where({ id }).first();

const insert = async (data) => db("faq").insert(data);

const update = async (id, data) => db("faq").where({ id }).update(data);

const deleted = async (id) => db("faq").where({ id }).del();

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleted,
};
