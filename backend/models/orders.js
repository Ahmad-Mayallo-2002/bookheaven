const mongoose = require("mongoose");

const { model, Schema, Types } = mongoose;

const ordersSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    book: {
      type: Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out of Delivery", "Delivered Canceled"],
    },
  },
  { timestamps: true, collection: "orders" }
);

const Order = model("Order", ordersSchema);
module.exports.Order = Order;
