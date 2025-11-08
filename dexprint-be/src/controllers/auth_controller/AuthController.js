const authModel = require("../../models/auth.model");
const {
  verifyPassword,
  generateToken,
  generateRefreshToken,
} = require("../../services/auth.service");
const { success, error } = require("../../helper/common");

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password)
      return error(res, "Username & Password Required!", 401);

    let user = await authModel.login(username);
    if (!user || user.length === 0) return error(res, "User Not Found!", 404);

    const passwordIsMatch = await verifyPassword(password, user.password);
    if (!passwordIsMatch) return error(res, "Incorrect Password!", 400);

    let userData = {
      userId: user.userId,
      username: user.username,
      roleId: user.roleId,
      roleName: user.roleName,
    };

    const access_token = generateToken(userData);
    const refresh_token = generateRefreshToken(userData);

    return success(res, {
      ...userData,
      access_token,
      refresh_token,
    });
  } catch (e) {
    console.log(e);
    error(res, "Internal Server Error!", 500);
  }
};

module.exports = { login };
