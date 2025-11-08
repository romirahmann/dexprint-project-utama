const userModel = require("../../models/user.model");
const { hashPassword } = require("../../services/auth.service");
const api = require("../../helper/common");
const { emit } = require("../../services/socket.service");
/* ============================================================
   ✅ GET ALL USERS
============================================================ */
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.getAll();
    return api.success(res, users);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ REGISTER / CREATE USER
============================================================ */
const register = async (req, res) => {
  const data = req.body;
  try {
    if (!data?.username || !data?.password) {
      return api.error(res, "Username & password required!", 400);
    }

    // 🔒 Hash password sebelum simpan
    data.password = await hashPassword(data.password);

    const result = await userModel.insert(data);

    // 🔔 Emit event ke semua client
    emit("user_created", {
      message: "New user registered",
      user: { id: result[0], username: data.username },
    });

    return api.success(res, result, "User registered successfully");
  } catch (error) {
    console.error("❌ Error register:", error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ GET USER BY ID
============================================================ */
const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.GetByUserID(id);
    if (!user) return api.error(res, "User not found", 404);
    return api.success(res, user);
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ UPDATE USER
============================================================ */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const existing = await userModel.GetByUserID(id);
    if (!existing) return api.error(res, "User not found", 404);

    const result = await userModel.update(id, data);

    // 🔔 Emit event update
    emit("user_updated", {
      message: "User data updated",
      userId: id,
      changes: data,
    });

    return api.success(res, result, "User updated successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ DELETE USER
============================================================ */
const deletedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.GetByUserID(id);
    if (!user) return api.error(res, "User not found", 404);

    const result = await userModel.remove(id);

    // 🔔 Emit event delete
    emit("user_deleted", {
      message: "User deleted",
      userId: id,
      username: user.username,
    });

    return api.success(res, result, "User deleted successfully");
  } catch (error) {
    console.error(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

/* ============================================================
   ✅ EXPORT MODULE
============================================================ */
module.exports = {
  getAllUser,
  getUserByID,
  updateUser,
  deletedUser,
  register,
};
