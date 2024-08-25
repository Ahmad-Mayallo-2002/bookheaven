const { Router } = require("express");
const { authenticationFunction } = require("../middlewares/userAuth.js");
const { User } = require("../models/users.js");
const { config } = require("dotenv");

config();

const router = Router();

// Add to Favorite List
router.put(
  "/add-favorite/:bookId",
  authenticationFunction,
  async (req, res) => {
    try {
      const { bookId } = req.params;
      const { id } = req.headers;
      const user = await User.findById(id);
      const isFavoriteOrNot = user.favorites.includes(bookId);
      if (!isFavoriteOrNot) {
        await User.findByIdAndUpdate(id, { $push: { favorites: bookId } });
        return res
          .status(200)
          .json({ msg: "New Book is Added to Favorite List" });
      } else {
        return res
          .status(400)
          .json({ msg: "This Book is Already Existing in Favorite List" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

// Delete to Favorite List
router.delete(
  "/delete-favorite/:bookId",
  authenticationFunction,
  async (req, res) => {
    try {
      const { bookId } = req.params;
      const { id } = req.headers;
      const user = await User.findById(id);
      const isFavorite = user?.favorites?.includes(bookId);
      if (isFavorite) {
        await User.findByIdAndUpdate(id, { $pull: { favorites: bookId } });
        return res
          .status(200)
          .json({ msg: "A Book is Removed from Favorite List" });
      } else {
        return res
          .status(400)
          .json({ msg: "This Book is not Existing in Favorite List" });
      }
    } catch (error) {
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

// Remove From All Favorites
router.delete("/clear-favorites", async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.favorites.length !== 0) {
      await User.findByIdAndUpdate(id, { $set: { favorites: [] } });
      return res.status(200).json({ msg: "Now Favorites is Empty" });
    } else {
      return res.status(400).json({ msg: "Favorites is Already Empty" });
    }
  } catch (error) {
    res.status.json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Get Favorites List
router.get("/get-favorites", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favorites");
    const favoritesListCondition =
      user.favorites.length !== 0
        ? res.status(200).json(user?.favorites)
        : res.status(400).json({ msg: "Favorite List is Empty" });
    return favoritesListCondition;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
