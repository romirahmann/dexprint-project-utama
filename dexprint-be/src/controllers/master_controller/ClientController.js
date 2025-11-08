const clientModel = require("../../models/client.model");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");
const cloud = require("../../helper/cloudinary");

/* ============================================================
   ✅ GET ALL CLIENTS
============================================================ */
const getAllClient = async (req, res) => {
  try {
    const clients = await clientModel.getAll();
    return api.success(res, clients);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET CLIENT BY ID
============================================================ */
const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientModel.getById(id);
    if (!client) return api.error(res, "Client not found", 404);
    return api.success(res, client);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ CREATE CLIENT
============================================================ */
const createClient = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    if (!file) return api.error(res, "Logo file is required", 400);

    const client = {
      clientName: name,
      clientLogo: file.path,
    };

    const result = await clientModel.insert(client);
    emit("client:create", result);

    return api.success(res, result);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE CLIENT
============================================================ */
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const file = req.file;

  try {
    const oldClient = await clientModel.getById(id);
    if (!oldClient) return api.error(res, "Client not found", 404);

    const updateData = {
      clientName: name || oldClient.clientName,
      clientLogo: oldClient.clientLogo,
    };

    if (file && file.path) {
      if (oldClient.clientLogo) {
        try {
          const publicId = cloud.getPublicId(oldClient.clientLogo);
          await cloud.deleteFile(publicId);
        } catch (deleteErr) {
          console.warn(
            "⚠️ Failed to delete old Cloudinary logo:",
            deleteErr.message
          );
        }
      }
      updateData.clientLogo = file.path;
    }

    const result = await clientModel.update(id, updateData);
    emit("client:update", { id, ...updateData });

    return api.success(res, result, "Client updated successfully");
  } catch (error) {
    console.error("❌ updateClient error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE CLIENT
============================================================ */
const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await clientModel.getById(id);
    if (!client) return api.error(res, "Client not found", 404);

    if (client.clientLogo) {
      try {
        const publicId = cloud.getPublicId(client.clientLogo);
        await cloud.deleteFile(publicId);
      } catch (deleteErr) {
        return api.error(res, "Failed To Delete!", 400);
      }
    }

    await clientModel.deleted(id);
    emit("client:delete", { id });

    return api.success(res, {}, "Client deleted successfully");
  } catch (error) {
    console.error("❌ deleteClient error:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllClient,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
