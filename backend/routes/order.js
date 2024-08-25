const { Router } = require("express");
const { Order } = require("../models/orders.js");
const { User } = require("../models/users.js");
const { authenticationFunction } = require("../middlewares/userAuth.js");
const { config } = require("dotenv");

config();

const router = Router();

// Place Order
router.post(
  "/place-order/:bookId",
  authenticationFunction,
  async (req, res) => {
    try {
      const { id } = req.headers;
      const { bookId } = req.params;
      const user = await User.findById(id);
      const existingBook = user.orders.includes(bookId);
      if (!existingBook) {
        const order = new Order({
          user: id,
          book: bookId,
        });
        await order.save();

        await User.findByIdAndUpdate(id, { $push: { orders: bookId } });
        return res.status(200).json({
          status: "Success",
          msg: "Order Placed Successfully",
        });
      } else {
        return res.status(400).json({ msg: "This Book is Already Ordered" });
      }
    } catch (error) {
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

// Cancel Order
router.delete(
  "/cancel-order/:bookId",
  authenticationFunction,
  async (req, res) => {
    try {
      const { id } = req.headers;
      const { bookId } = req.params;
      await User.findByIdAndUpdate(id, { $pull: { orders: bookId } });
      return res.status(200).json({
        status: "Success",
        msg: "Order Canceled Successfully",
      });
    } catch (error) {
      res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
    }
  }
);

// Remove From All Orders
router.delete("/clear-orders", async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.orders.length !== 0) {
      await User.findByIdAndUpdate(id, { $set: { orders: [] } });
      return res.status(200).json({ msg: "Now Orders is Empty" });
    } else {
      return res.status(400).json({ msg: "Orders is Already Empty" });
    }
  } catch (error) {
    res.status.json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Get Orders For Particular User
router.get("/get-orders", authenticationFunction, async (req, res) => {
  try {
    const { id } = req.headers;
    const ordersData = await User.findById(id).populate("orders");
    const ordersList = ordersData.orders.reverse();
    if (ordersList.length === 0)
      return res.status(400).json({ msg: "There is no Orders" });
    return res.status(200).json(ordersList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

// Get Orders --Admin
router.get("/get-orders-history", authenticationFunction, async (req, res) => {
  try {
    const ordersData = await Order.find()
      .populate({
        path: "user",
        select: ["username", "email"],
      })
      .populate({
        path: "book",
      })
      .sort({ createdAt: -1 });
    res.status(200).json(ordersData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: process.env.SERVER_ERROR_MESSAGE });
  }
});

module.exports = router;
