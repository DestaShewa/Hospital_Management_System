// server/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // We try to connect to the MongoDB URI from our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log a message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If there is an error, log the error message and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
