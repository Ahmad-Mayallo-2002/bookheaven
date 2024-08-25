const { Router } = require("express");
const { User } = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticationFunction } = require("../middlewares/userAuth.js");
const { config } = require("dotenv");
const multer = require("multer");

config();

const { hash, compare } = bcrypt;
const { sign } = jwt;

const upload = multer({ limits: { fileSize: 4 * 1024 * 1024 } });

const router = Router();

// Add New User
router.post("/sign-up", upload.single("avatar"), async (req, res) => {
  try {
    const { username, email, password, confirmPassword, avatar, role } =
      req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser?.email)
      return res.status(400).json({ msg: "This Email is Already Existing" });

    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Check on Password Fields" });

    const hashPassword = await hash(password, 10);
    const hashconfirmPassword = await hash(confirmPassword, 10);
    const user = new User({
      username: username,
      email: email,
      password: hashPassword,
      confirmPassword: hashconfirmPassword,
      avatar: avatar,
      role: role,
    });

    await user.save();
    return res.status(200).json({ msg: "Sign Up is Done" });
  } catch (error) {
    console.log(req.body);
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Sign In
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email: email,
    });

    if (!existingUser) {
      return res.status(400).json({ msg: "Invalid Email or Password" });
    }

    compare(password, existingUser.password, (err, data) => {
      if (data) {
        const myPayload = [
          { username: existingUser.username },
          { role: existingUser.role },
        ];
        const token = sign({ myPayload }, process.env.JWT_KEY, {
          expiresIn: "30d",
        });
        return res.status(200).json({
          id: existingUser._id,
          token: token,
          role: existingUser.role,
        });
      } else {
        return res.status(400).json({ msg: "Invalid Email or Password" });
      }
    });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Sign In
router.post("/sign-in-admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email: email,
      role: "admin",
    });

    if (!existingUser) {
      return res.status(400).json({ msg: "This Admin is not Found" });
    }

    compare(password, existingUser.password, (err, data) => {
      if (data) {
        const myPayload = [
          { username: existingUser.username },
          { role: existingUser.role },
        ];
        const token = sign({ myPayload }, process.env.JWT_KEY, {
          expiresIn: "30d",
        });
        return res.status(200).json({
          id: existingUser._id,
          token: token,
          role: existingUser.role,
        });
      } else {
        return res.status(400).json({ msg: "Invalid Email or Password" });
      }
    });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Get All Users
router.get("/all-users", authenticationFunction, async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const { id } = req.headers;
    const adminOrUser = await User.findOne({ _id: id });
    const allUsers = await User.find({ role: "user" });
    const users = await User.find({ role: "user" })
      .limit(limit)
      .skip(skip)
      .select("-password")
      .select("-confirmPassword");
    if (adminOrUser.role === "admin") {
      return res.status(200).json({ users: users, length: allUsers?.length });
    } else {
      return res
        .status(400)
        .json({ msg: "You are not Admin to Access to Users" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Get Single User
router.get("/user", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id)
      .select("-password")
      .select("-confirmPassword");
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Delete User
router.delete("/delete-user/:id", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Delete User is Done" });
  } catch (error) {
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Update User Data
router.put("/update-user", authenticationFunction, async (req, res) => {
  try {
    const { avatar, username, email, password, confirmPassword } = req.body;
    const { id } = req.headers;
    const hashPassword = await hash(password, 10);
    const hashConfirmPassword = await hash(confirmPassword, 10);
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          avatar: avatar,
          username: username,
          email: email,
          password: hashPassword,
          confirmPassword: hashConfirmPassword,
        },
      },
      { new: true }
    );
    return res.status(200).json({ msg: "User is Updated" });
  } catch (error) {
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
