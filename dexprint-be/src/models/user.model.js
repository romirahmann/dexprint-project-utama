const db = require("../database/db.config");

const getAll = async () =>
  db("users as u")
    .select("u.usename", "u.roleId", "r.roleName")
    .innerJoin("user_roles as r");
const GetByUserID = async (userId) =>
  db("users as u")
    .select("u.usename", "u.roleId", "r.roleName")
    .innerJoin("user_roles as r")
    .where("u.userId", userId)
    .first();
const insert = async (data) => db("users").insert(data);
const update = async (userId, data) =>
  db("users").where({ userId }).update(data);
const remove = async (userId) => db("users").where({ userId }).del();

module.exports = {
  getAll,
  GetByUserID,
  update,
  remove,
  insert,
};
