const db = require("../database/db.config");

const login = async (username) =>
  await db("users as u")
    .select("u.*", "r.roleName")
    .join("user_roles as r", "u.roleId", "r.roleId")
    .where("u.username", username)
    .first();

module.exports = { login };
