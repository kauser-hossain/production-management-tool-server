const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "অবৈধ টোকেন।", error });
  }
};
