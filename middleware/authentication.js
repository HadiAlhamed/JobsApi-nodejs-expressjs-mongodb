const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    //we signed with userId and name
    const { userId, name } = decoded;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError(`Invalid Credentials, ${error}`);
  }
};

module.exports = authMiddleware;
