// config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/finalProject", {
       useNewUrlParser: true, useUnifiedTopology: true 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
