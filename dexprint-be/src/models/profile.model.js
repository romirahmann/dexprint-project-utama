const db = require("../database/db.config");

// GET ALL COMPANY PROFILES
const getProfile = async () =>
  db("companyprofile")
    .select(
      "profileId",
      "companyName",
      "phone",
      "email",
      "established",
      "websiteName",
      "employees",
      "address",
      "description",
      "vision",
      "mission"
    )
    .first();

// GET COMPANY PROFILE BY ID
const getById = async (id) =>
  db("companyprofile")
    .select(
      "profileId",
      "companyName",
      "phone",
      "email",
      "established",
      "websiteName",
      "employees",
      "address",
      "description",
      "vision",
      "mission"
    )
    .where("profileId", id)
    .first();

// CREATE COMPANY PROFILE
const create = async (data) => db("companyprofile").insert(data).returning("*");

// UPDATE COMPANY PROFILE
const update = async (id, data) =>
  db("companyprofile").where("profileId", id).update(data);

// DELETE COMPANY PROFILE
const remove = async (id) => db("companyprofile").where("profileId", id).del();

module.exports = {
  getProfile,
  getById,
  create,
  update,
  remove,
};
