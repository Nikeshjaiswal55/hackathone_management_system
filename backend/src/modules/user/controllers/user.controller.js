const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  try {
    const newUser = new User({ name, email, mobileNumber, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res
    .status(200)
    .json({ message: "Login successful", token, userId: user._id });
};

// Update Profile
const updateProfile = async (req, res) => {
  const { bio, location, skills } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.skills = skills || user.skills;
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, updateProfile };
