const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authenticationRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");
const favoritesRouter = require("./routes/favorites.js");
const cartRouter = require("./routes/cart.js");
const orderRouter = require("./routes/order.js");
require("./db.js");

config();

const primaryRoute = "/api";

// Init Express App
const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [""],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
    paramaterLimit: "10000",
  })
);

// Port
const port = process.env.PORT;

// Routes

app.use(primaryRoute, authenticationRouter);
app.use(primaryRoute, booksRouter);
app.use(primaryRoute, favoritesRouter);
app.use(primaryRoute, cartRouter);
app.use(primaryRoute, orderRouter);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});

app.listen(port, () =>
  console.log(`Server is Running on Port ${port} http://localhost:${port}`)
);
