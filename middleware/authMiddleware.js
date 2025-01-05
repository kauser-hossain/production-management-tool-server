const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }

  try {
    // console.log("Received Token:", token); // টোকেন চেক
    const decoded = jwt.verify(token, jwtSecret); // টোকেন যাচাই
    // console.log("Decoded Token:", decoded); // ডিকোড করা ডেটা

    req.user = await User.findById(decoded.id).select("-password"); // ইউজার বের করা
    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // console.log("User from DB:", req.user); // ইউজার চেক

    next(); // পরবর্তী Middleware বা রুটে পাঠানো
  } catch (error) {
    // console.error("Error Verifying Token:", error.message);
    res.status(401).json({ message: "অবৈধ টোকেন।", error });
  }
};


