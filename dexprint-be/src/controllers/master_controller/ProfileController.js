const companyModel = require("../../models/profile.model");
const api = require("../../helper/common");

// GET ALL COMPANY PROFILES
const getAllCompany = async (req, res) => {
  try {
    const companies = await companyModel.getProfile();
    return api.success(res, companies);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// GET COMPANY PROFILE BY ID
const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await companyModel.getById(id);
    if (!company) return api.error(res, "Company not found", 404);
    return api.success(res, company);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// CREATE COMPANY PROFILE
const createCompany = async (req, res) => {
  const data = req.body;
  try {
    const result = await companyModel.create(data);
    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// UPDATE COMPANY PROFILE
const updateCompany = async (req, res) => {
  const { id } = req.params;
  let data = { ...req.body };

  try {
    if (data.established) {
      const date = new Date(data.established);
      if (!isNaN(date)) {
        data.established = date.toISOString().slice(0, 10);
      } else {
        console.warn("Invalid date format received:", data.established);
        delete data.established;
      }
    }

    const result = await companyModel.update(id, data);
    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// DELETE COMPANY PROFILE
const deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await companyModel.remove(id);
    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllCompany,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
