const mongoose = require("mongoose");
const { model, Schema, Types } = mongoose;

const booksSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "books" }
);

const Book = model("Book", booksSchema);
module.exports.Book = Book;
