const faqModel = require("../../models/faq.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");

/* ============================================================
   ✅ GET ALL FAQ
============================================================ */
const getAllFAQ = async (req, res) => {
  try {
    const faqs = await faqModel.getAll();
    return api.success(res, faqs);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET FAQ BY ID
============================================================ */
const getFAQById = async (req, res) => {
  const { id } = req.params;
  try {
    const faq = await faqModel.getById(id);
    if (!faq) return api.error(res, "FAQ not found", 404);
    return api.success(res, faq);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE FAQ
============================================================ */
const createFAQ = async (req, res) => {
  try {
    const data = req.body;

    const result = await faqModel.insert(data);

    emit("faq:create", result);

    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE FAQ
============================================================ */
const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const existing = await faqModel.getById(id);
    if (!existing) return api.error(res, "FAQ not found", 404);

    const result = await faqModel.update(id, data);

    emit("faq:update", { id, ...updateData });

    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE FAQ
============================================================ */
const deleteFAQ = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await faqModel.getById(id);
    if (!existing) return api.error(res, "FAQ not found", 404);

    await faqModel.deleted(id);

    emit("faq:delete", { id });

    return api.success(res, {});
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllFAQ,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};
