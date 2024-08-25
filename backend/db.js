const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

const { connect } = mongoose;

const dbConnect = async () => {
  try {
    connect(process.env.DATABASE_URL);
    console.log("Database Connection is Done");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();
