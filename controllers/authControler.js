const User = require("../models/User");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
// রেজিস্ট্রেশন
exports.register = async (req, res) => {
  // console.log("Register endpoint hit");
  const { username, password, email, role, officeIdCardNumber, phone, floor } =
    req.body;
  try {
    // console.log("Checking if user exists");
    const existUser = await User.findOne({ officeIdCardNumber });
    if (existUser) {
      // console.log("User already exists"); // Log if user exists
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // console.log("Creating new user instance"); // Log before creating the user
    const user = new User({
      username,
      password,
      email,
      role,
      officeIdCardNumber,
      phone,
      floor,
    });
    // console.log("Saving user:", user); // Log the user object before saving
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    // console.error("Error during registration:", error); // Log any error
    res
      .status(500)
      .json({ success: false, error: error, message: "Server error" });
  }
};
// লগইন
exports.login = async (req, res) => {
  const { officeIdCardNumber, password } = req.body;
  try {
    const user = await User.findOne({ officeIdCardNumber }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });
    // console.log("Generated Token:", token);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error, message: "Server error" });
  }
};
// প্রোফাইল
exports.getProfile = (req, res) => {
  const userId = req.user.id; // From the decoded token
  // console.log("User ID from token:", userId);

  // Fetch user from the database using userId
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      // console.error(err);
      res.status(500).json({ message: "Server error" });
    });
};
// লগআউট
exports.logout = (req, res) => {
  // Invalidate the token or clear the cookie (if using cookies for token storage)
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
// পাসওয়ার্ড ভুলে গেলে
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Generate a reset token (this can be a JWT or a random string)
    const resetToken = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    // Send the reset token to the user's email (this is a placeholder, implement actual email sending)
    // console.log(`Reset token for ${email}: ${resetToken}`);

    res
      .status(200)
      .json({ success: true, message: "Password reset token sent to email" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error, message: "Server error" });
  }
};
