const { Router } = require("express");
const { User } = require("../models/users.js");
const { config } = require("dotenv");

config();

const router = Router();

// Add to Cart
router.put("/add-cart/:bookId", async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookId } = req.params;
    const user = await User.findById(id);
    const existingInCart = user.cart.includes(bookId);

    if (!existingInCart) {
      await User.findByIdAndUpdate(id, { $push: { cart: bookId } });
      return res.status(200).json({ msg: "Book is Added to Cart" });
    } else {
      return res.status(400).json({ msg: "This Book is Already in Cart" });
    }
  } catch (error) {
    res.status.json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Remove From Cart
router.delete("/delete-cart/:bookId", async (req, res) => {
  try {
    const { id } = req.headers;
    const { bookId } = req.params;
    const user = await User.findById(id);
    const existingInCart = user.cart.includes(bookId);

    if (existingInCart) {
      await User.findByIdAndUpdate(id, { $pull: { cart: bookId } });
      return res.status(200).json({ msg: "Book is Removed from Cart" });
    } else {
      return res
        .status(400)
        .json({ msg: "This Book is Already Removed from Cart" });
    }
  } catch (error) {
    res.status.json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Remove From All Cart
router.delete("/clear-cart", async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.cart.length !== 0) {
      await User.findByIdAndUpdate(id, { $set: { cart: [] } });
      return res.status(200).json({ msg: "Now Cart is Empty" });
    } else {
      return res.status(400).json({ msg: "Cart is Already Empty" });
    }
  } catch (error) {
    res.status.json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Get Cart
router.get("/get-cart", async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("cart");
    if (user.cart.length !== 0) {
      return res.status(200).json(user?.cart);
    } else {
      return res.status(400).json({ msg: "Cart is Empty" });
    }
  } catch (error) {
    res.status.json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
