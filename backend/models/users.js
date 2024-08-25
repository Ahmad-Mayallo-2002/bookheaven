const mongoose = require("mongoose");

const { model, Schema, Types } = mongoose;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favorites: [
      {
        type: Types.ObjectId,
        ref: "Book",
      },
    ],
    cart: [
      {
        type: Types.ObjectId,
        ref: "Book",
      },
    ],
    orders: [
      {
        type: Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true, collection: "users" }
);

const User = model("User", usersSchema);
module.exports.User = User;
