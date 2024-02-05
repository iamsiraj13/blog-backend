const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  }
};

module.exports = authGuard;
