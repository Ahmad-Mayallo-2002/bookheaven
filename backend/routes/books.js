const { Router } = require("express");
const { Book } = require("../models/books.js");
const { User } = require("../models/users.js");
const { authenticationFunction } = require("../middlewares/userAuth.js");
const { config } = require("dotenv");

config();

const router = Router();

// Add New Book
router.post("/add-book", authenticationFunction, async (req, res) => {
  try {
    const { url, title, author, price, desc, language } = req.body;
    const { id } = req.headers;
    const userOrAdmin = await User.findOne({ _id: id });
    const existingBook = await Book.findOne({
      title: title,
      author: author,
      desc: desc,
    });
    if (existingBook) {
      return res.status(400).json({ msg: "This Book is Already Existing" });
    }
    if (userOrAdmin.role === "admin") {
      const book = new Book({
        url: url,
        title: title,
        author: author,
        price: price,
        desc: desc,
        language: language,
      });
      await book.save();
      return res.status(200).json({ msg: "New Book is Added" });
    } else {
      return res.status(400).json({ msg: "You are not Admin to Add New Book" });
    }
  } catch (error) {
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

router.get("/all-books", authenticationFunction, async (req, res) => {
  try {
    const { limit, skip } = req.query;
    const books = await Book.find().limit(limit).skip(skip);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

router.get("/all-books/:id", authenticationFunction, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

router.delete("/delete-book/:id", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    const userOrAdmin = await User.findOne({ _id: id });
    if (userOrAdmin.role === "admin") {
      await Book.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "One Book is Deleted" });
    } else {
      return res.status(400).json({ msg: "You are not Admin to Delete Book" });
    }
  } catch (error) {
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

router.patch(
  "/update-book/:bookId",
  authenticationFunction,
  async (req, res) => {
    try {
      const { id } = req.headers;
      const { bookId } = req.params;
      const { url, title, author, price, desc, language } = req.body;
      const userOrAdmin = await User.findOne({ _id: id });
      if (userOrAdmin.role === "admin") {
        await Book.findByIdAndUpdate(bookId, {
          $set: {
            url: url,
            title: title,
            author: author,
            price: price,
            desc: desc,
            language: language,
          },
        });
        return res.status(200).json({ msg: "One Book is Updated" });
      } else {
        return res
          .status(400)
          .json({ msg: "You are not Admin to Update Book Data" });
      }
    } catch (error) {
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

module.exports = router;
